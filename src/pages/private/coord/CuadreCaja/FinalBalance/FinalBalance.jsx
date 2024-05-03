/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import styled from "styled-components";
import Nota from "../Nota/Nota";
import {
  DateCurrent,
  formatNumberMoneda,
} from "../../../../../utils/functions";

const FinalBalanceStyle = styled.div`
  display: grid;
  grid-template-rows: 40px 225px 50px min-content auto;
  padding: 10px 20px;

  h1 {
    font-size: 25px;
    margin: auto;
    margin-left: 0;
  }

  .form-fb {
    max-width: 300px;
    display: grid;
    gap: 10px;
  }

  .action-end {
    height: min-content;
    button {
      position: relative;
      height: 65px;
      width: 100%;
      margin: auto;
      font-size: 23px;
      font-weight: 500;
      letter-spacing: 1px;
      border-radius: 5px;
      text-transform: uppercase;
      border: 1px solid transparent;
      outline: none;
      cursor: pointer;
      background: #5b81ea;
      overflow: hidden;
      transition: 0.6s;
      color: #fff;
      border-color: #3868eb;

      &::before,
      &::after {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        height: 100%;
        filter: blur(30px);
        opacity: 0.4;
        transition: 0.6s;
      }

      &:before {
        width: 60px;
        background: rgba(255, 255, 255, 0.6);
        transform: translateX(-130px) skewX(-45deg);
      }

      &:after {
        width: 30px;
        background: rgba(255, 255, 255, 0.6);
        transform: translateX(-130px) skewX(-45deg);
      }

      &:hover:before,
      &:hover:after {
        opacity: 0.6;
        transform: translateX(320px) skewX(-45deg);
      }

      &:hover {
        color: #f2f2f2;
        background: #44df6b;
      }
    }
  }
`;

const FinalBalance = ({
  totalCaja,
  infoState,
  sDisabledCuadre,
  openModal,
  handleSavedActivated,
  savedActivated,
  handleChangeCorte,
  handleChangeNotas,
  cajaFinal,
  datePrincipal,
}) => {
  return (
    <FinalBalanceStyle>
      <h1>Finaliza el cuadre con :</h1>
      <div className="form-fb">
        <TextInput
          label="Monto en Caja"
          radius="md"
          value={formatNumberMoneda(+totalCaja)}
          readOnly
        />
        <TextInput
          label="Corte"
          radius="md"
          disabled={sDisabledCuadre}
          value={formatNumberMoneda(+infoState?.corte)}
          onChange={(e) => {
            const inputValue = e.target.value;
            const numericValue = inputValue.replace(/[^0-9.]/g, ""); // Filtrar caracteres no numéricos, permitiendo el punto decimal

            handleChangeCorte(numericValue);
          }}
        />
        <TextInput
          label="Caja Final"
          radius="md"
          value={formatNumberMoneda(+cajaFinal)}
          readOnly
        />
      </div>
      <h1>Se hace Entrega de {formatNumberMoneda(+infoState?.corte, true)}</h1>
      {!sDisabledCuadre ? (
        <div className="action-end">
          <button
            type="button"
            onClick={async () => {
              await handleSavedActivated(true);
              openModal(true);
            }}
          >
            Guardar y Generar PDF
          </button>
        </div>
      ) : (
        <div className="action-end">
          <button
            type="button"
            onClick={async () => {
              await handleSavedActivated(true);
              openModal(false);
            }}
          >
            Generar PDF
          </button>
        </div>
      )}
      <div style={{ pointerEvents: sDisabledCuadre ? "none" : "auto" }}>
        <Nota
          onMode={savedActivated} // Cambiar el diseño si se va a generar el PDF
          setMode={handleSavedActivated} // Si se cancela el PDF vuelve el diseño Original
          infoNotas={infoState?.notas} // Info de las notas
          handleGetData={(notas) => {
            // Cambiar el estado del padre con la info del hijo
            handleChangeNotas(notas);
          }}
        />
      </div>
    </FinalBalanceStyle>
  );
};

export default FinalBalance;
