import { useEffect, useState, useMemo } from "react";
import "./Search.scss";
import Cart from "../Cart/cart";
import OrderMobile from "../OrderMobile/orderMobile";
import FilterMobile from "../FilterMobile/filterMobile";

export type Product = {
  id: string;
  name: string;
  price: number;
  parcelamento: [number, number];
  color: string;
  image: string;
  size: string[];
  date: string;
};

const Search = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterColrsvisible, setFilterColorsVisible] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [visibleProducts, setVisibleProducts] = useState(isMobile ? 4 : 9);

  console.log(isMobile);

  const priceRanges = [
    { id: "0-50", min: 0, max: 50, label: "de R$0 até R$50" },
    { id: "51-150", min: 51, max: 150, label: "de R$51 até R$150" },
    { id: "151-300", min: 151, max: 300, label: "de R$151 até R$300" },
    { id: "301-500", min: 301, max: 500, label: "de R$301 até R$500" },
    { id: "500+", min: 501, max: 10000000, label: "a partir de R$500" },
  ];

  const sortOptions = [
    { id: "recent", label: "Mais recentes" },
    { id: "lower", label: "Menor preço" },
    { id: "higher", label: "Maior preço" },
  ];


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        const uniqueProducts = data.filter(
          (item: Product, index: number, self: Product[]) =>
            index === self.findIndex((p: Product) => p.id === item.id)
        );
        setProducts(uniqueProducts);

        const colors: string[] = Array.from(new Set(uniqueProducts.map((p: Product) => p.color)));
        setAvailableColors(colors);

        const sizes: string[] = Array.from(
          new Set<string>(
            uniqueProducts.flatMap((p: Product) => Array.isArray(p.size) ? p.size : [])
          )
        ).sort((a, b) => a.localeCompare(b));

        setAvailableSizes(sizes);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.size.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          return range && p.price >= range.min && p.price <= range.max;
        });
      });
    }

    if (sortOption === "lower") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "higher") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "recent") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [products, selectedColors, sortOption, selectedSizes, selectedPriceRanges]);

  const sizeOrder = ["P", "M", "G", "GG", "U"];

  const orderedSizes = useMemo(() => {
    return [...availableSizes].sort((a, b) => {
      const aIsNum = /^\d/.test(a);
      const bIsNum = /^\d/.test(b);
      const aIndex = sizeOrder.indexOf(a);
      const bIndex = sizeOrder.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      if (aIsNum && bIsNum) return parseInt(a) - parseInt(b);

      return a.localeCompare(b);
    });
  }, [availableSizes]);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const togglePriceRange = (id: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );
  };

  if (loading) return (
    <div className="loader"><div className="loader-circle"></div></div>
  )

  return (
    <section className="search">
      <div className="search__topo">
        <h1 className="search__topo_title">Blusas</h1>
        <select
          id="sort"
          className="search__topo_select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Ordenar por:</option>
          <option value="recent">Mais recentes</option>
          <option value="lower">Menor preço</option>
          <option value="higher">Maior preço</option>
        </select>
      </div>
      <div className="search__mobile">
        <div className={"search__mobile_button  first"} onClick={() => setIsFilterModalOpen(true)}>Filtrar</div>
        {isFilterModalOpen && (
          <FilterMobile
            availableColors={availableColors}
            availableSizes={orderedSizes}
            priceRanges={priceRanges}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            selectedPriceRanges={selectedPriceRanges}
            toggleColor={toggleColor}
            toggleSize={toggleSize}
            togglePriceRange={togglePriceRange}
            onClose={() => setIsFilterModalOpen(false)}
            onApply={() => setIsFilterModalOpen(false)}
            onClear={() => {
              setSelectedColors([]);
              setSelectedSizes([]);
              setSelectedPriceRanges([]);
            }}
          />
        )}
        <div className="search__mobile_button" onClick={() => setIsOrderModalOpen(true)}>
          Ordernar
        </div>
        {isOrderModalOpen && (
          <OrderMobile
            title="Ordenar"
            options={sortOptions}
            selectedOption={sortOption}
            onSelect={(id) => setSortOption(id)}
            onClose={() => setIsOrderModalOpen(false)}
          />
        )}
      </div>
      <div className="search__content">
        <div className="search__content_filter">
          <div className="search__content_cor">
            <p className="search__content_title" >Cores</p>
            <div className="search__content_cor_grid">
              {availableColors.slice(0, filterColrsvisible).map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                  />
                  {color}
                </label>
              ))}
              {
                filterColrsvisible === 5 && (
                  <p onClick={() => setFilterColorsVisible(10)} className="search__content_cor_more">
                    Ver todas as cores    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.5 0.500031L4 5.50003L7.5 0.505224" stroke="#666666" stroke-linecap="round" />
                    </svg>
                  </p>
                )}
            </div>
          </div>
          <div className="search__content_size">
            <p className="search__content_title">Tamanhos</p>
            <div className="search__content_size_grid">
              {orderedSizes.map((size) => (
                <div
                  key={size}
                  className={`search__content_size_item ${selectedSizes.includes(size) ? "selected" : ""
                    }`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div className="search__content_cor">
            <p className="search__content_title">Faixa de Preço</p>
            <div className="search__content_cor_grid">
              {priceRanges.map((range) => (
                <label key={range.id}>
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.id)}
                    onChange={() => togglePriceRange(range.id)}
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="search__content_gridContent">
          <div>
            {
              filteredProducts.length > 0 ? (
                <div className="search__content_grid">
                  {filteredProducts.slice(0, visibleProducts).map((p) => (
                    <Cart
                      key={p.id}
                      id={p.id}
                      image={p.image}
                      name={p.name}
                      parcelamento={p.parcelamento}
                      price={p.price}
                    />
                  ))}
                </div>
              ) : (
                <p className="search__content_gridContent_no-products">
                  Nenhum produto corresponde aos filtros selecionados. Tente ajustar os filtros ou limpar a seleção.
                </p>
              )
            }
            {
              visibleProducts < filteredProducts.length && (
                <div className="search__content_gridContent_more" onClick={() => setVisibleProducts(20)}>
                  <p>Carregar mais</p>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
