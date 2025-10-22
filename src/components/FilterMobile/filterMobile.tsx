import { useState } from "react";
import "./FilterMobile.scss";

interface FilterMobileProps {
  availableColors: string[];
  availableSizes: string[];
  priceRanges: { id: string; label: string }[];
  selectedColors: string[];
  selectedSizes: string[];
  selectedPriceRanges: string[];
  toggleColor: (color: string) => void;
  toggleSize: (size: string) => void;
  togglePriceRange: (id: string) => void;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}

const FilterMobile = ({
  availableColors,
  availableSizes,
  priceRanges,
  selectedColors,
  selectedSizes,
  selectedPriceRanges,
  toggleColor,
  toggleSize,
  togglePriceRange,
  onClose,
  onApply,
  onClear,
}: FilterMobileProps) => {

  const [openColors, setOpenColors] = useState(false);
  const [openSizes, setOpenSizes] = useState(false);
  const [openPrices, setOpenPrices] = useState(false);

  return (
    <div className="filtermobile">
      <div className="filtermobile__container">
        <div className="filtermobile__header">
          <h2>Filtrar</h2>
          <svg
            onClick={onClose}
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 18.1018L17.5547 0.249885" stroke="black" />
            <line
              y1="-0.5"
              x2="25.2899"
              y2="-0.5"
              transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 0.485352)"
              stroke="black"
            />
          </svg>
        </div>
        <div className="filtermobile__content">
          <div className="filtermobile__cor">
            <div className="filtermobile__dropdown" onClick={() => setOpenColors(!openColors)}>
              <p className="filtermobile__title">Cores</p>
              <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.500061L9.5 13.5001L18.5 0.513564" stroke="#666666" stroke-linecap="round" />
              </svg>
            </div>
            {openColors && (
              <div className="filtermobile__content_grid">
                {availableColors.map((color) => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => toggleColor(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="filtermobile__content_size">
            <div className="filtermobile__dropdown" onClick={() => setOpenSizes(!openSizes)}>
              <p className="filtermobile__title">Tamanhos </p>
              <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.500061L9.5 13.5001L18.5 0.513564" stroke="#666666" stroke-linecap="round" />
              </svg>
            </div>
            {openSizes && (
              <div className="filtermobile__content_size_grid">
                {availableSizes.map((size) => (
                  <div
                    key={size}
                    className={`filtermobile__content_size_item ${selectedSizes.includes(size) ? "selected" : ""
                      }`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )
            }
          </div>
          <div className="filtermobile__cor">
            <div className="filtermobile__dropdown" onClick={() => setOpenPrices(!openPrices)}>
              <p className="filtermobile__title">Faixa de Preço</p>
              <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.500061L9.5 13.5001L18.5 0.513564" stroke="#666666" stroke-linecap="round" />
              </svg>
            </div>
            {openPrices && (
              <div className="filtermobile__content_grid">
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
            )
            }
          </div>
        </div>
        <div className="filtermobile__footer">
          <button className="filtermobile__footer_clear" onClick={onClear}>Limpar</button>
          <button className="filtermobile__footer_apply" onClick={onApply}>Aplicar</button>
        </div>
      </div>
    </div>
  );
};

export default FilterMobile;
