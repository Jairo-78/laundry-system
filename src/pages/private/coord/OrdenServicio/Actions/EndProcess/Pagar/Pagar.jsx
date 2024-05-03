/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { ingresoDigital } from "../../../../../../../services/global";
import { NumberInput } from "@mantine/core";
import { formatNumberMoneda } from "../../../../../../../utils/functions";

const Pagar = ({ setFieldValue, errors, touched, totalToPay }) => {
  return (
    <div className="content-pay">
      <fieldset className="checkbox-group">
        <legend className="checkbox-group-legend">Escoja Metodo de Pago</legend>
        <div className="checkbox">
          <label className="checkbox-wrapper">
            <input
              className="checkbox-input"
              type="radio"
              name="metodoPago"
              value="Efectivo"
              onChange={(e) => {
                setFieldValue("metodoPago", e.target.value);
              }}
            />
            <span className="checkbox-tile">
              <span className="checkbox-icon">
                {/* <Taxi className="custom-icon" /> */}
              </span>
              <span className="checkbox-label">Efectivo</span>
            </span>
          </label>
        </div>
        <div className="checkbox">
          <label className="checkbox-wrapper">
            <input
              className="checkbox-input"
              type="radio"
              name="metodoPago"
              value={ingresoDigital}
              onChange={(e) => {
                setFieldValue("metodoPago", e.target.value);
              }}
            />
            <span className="checkbox-tile">
              <span className="checkbox-icon">
                {/* <Moto className="custom-icon" /> */}
              </span>
              <span className="checkbox-label">
                {ingresoDigital.charAt(0) +
                  ingresoDigital.slice(1).toLowerCase()}
              </span>
            </span>
          </label>
        </div>
        <div className="checkbox">
          <label className="checkbox-wrapper">
            <input
              className="checkbox-input"
              type="radio"
              name="metodoPago"
              value="Tarjeta"
              onChange={(e) => {
                setFieldValue("metodoPago", e.target.value);
              }}
            />
            <span className="checkbox-tile">
              <span className="checkbox-icon">
                {/* <Moto className="custom-icon" /> */}
              </span>
              <span className="checkbox-label">Tarjeta</span>
            </span>
          </label>
        </div>
        {errors.metodoPago && touched.metodoPago && (
          <div className="ico-req">
            <i className="fa-solid fa-circle-exclamation ">
              <div className="info-req" style={{ pointerEvents: "none" }}>
                <span>{errors.metodoPago}</span>
              </div>
            </i>
          </div>
        )}
      </fieldset>
      <div className="info-pay">
        <div className="input-monto">
          <NumberInput
            name="total"
            className="montoToPay"
            label={`Monto de Pago : Max(${formatNumberMoneda(
              totalToPay,
              true
            )})`}
            placeholder="Ingrese Monto"
            precision={2}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }
            onChange={(value) => setFieldValue("total", value)}
            min={0}
            step={1}
            max={+totalToPay}
            hideControls
            autoComplete="off"
          />
          {errors.total && touched.total && (
            <div className="ico-req">
              <i className="fa-solid fa-circle-exclamation ">
                <div className="info-req" style={{ pointerEvents: "none" }}>
                  <span>{errors.total}</span>
                </div>
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagar;
