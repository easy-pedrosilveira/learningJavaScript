import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.pageContent}>
        <div className={`${styles.body}`}>
          <p style={{ color: "#ff5100", fontSize: "35px" }} className=" mt-2">
            Recebemos seu pedido!
          </p>
          <div className={`${styles.copiaECola}`}>
            <div className={styles.codigoPIX}>
              <input
                type="text"
                //   value={returnBoleto?.DigitableLine}
                readOnly
              />
            </div>
            <div className={styles.separator}>
              <div
                style={{ cursor: "pointer" }}
                //   onClick={(e) => copyToClipboard(e)}
                className={styles.btnCopiaBarCode}
              >
                <p
                  style={{
                    fontSize: "16px",
                    color: "#353535",
                  }}
                >
                  Copiar código do boleto
                </p>
              </div>
              <div>
                <button
                //   onClick={() => router.push(returnBoleto?.Barcode)}
                >
                  Ver boleto
                </button>
              </div>

              <div className={styles.btnSubmit}>
                <button
                  className=" py-1"
                  type="submit"
                  style={{}}
                  // onClick={fecharComponentes}
                >
                  Finalizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
