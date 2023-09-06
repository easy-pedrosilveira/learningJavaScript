import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import useAuthContext from '../../data/hooks/useAuthContext'
import useBuyCreditsContext from '../../data/hooks/useBuyCreditsContext'
import Image from 'next/image'
import useAppContext from '../../data/hooks/useAppContext'
import PixModal from './pagamento-pix/PagamentoPix'
import BarcodeModal from './pagamento-boleto/PagamentoBoleto'
import PremiosModal from './pagamento-premios/PagamentoPremios'
import CloseModal from '../../../public/assets/imagens/close-modal-creditos.svg'

interface ModalProps {
  onModalChange: (isOpen: boolean) => void
  onRefreshChange: (isOpen: boolean) => void
}

export default function ComprarCreditosModal({
  onModalChange,
  onRefreshChange,
}: ModalProps) {
  const { setValue, value } = useBuyCreditsContext()
  const { appConfig } = useAppContext()
  const [counter, setCounter] = useState(0)
  const [running, setRunning] = useState(false)
  const { user } = useAuthContext()
  const [isModal, setIsModal] = useState(false)
  const [isModalBarCode, setIsModalBarCode] = useState(false)
  const [isModalPremios, setIsModalPremios] = useState(false)
  const [segundoComponenteAberto, setSegundoComponenteAberto] = useState(true)
  const [segundoComponenteAbertoBarCode, setSegundoComponenteAbertoBarCode] =
    useState(true)
  const [segundoComponenteAbertoPremios, setSegundoComponenteAbertoPremios] =
    useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = [1, 2, 3, 4, 5]; // Lista de itens do carrossel


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    )
  }

  useEffect(() => {
    let interval
    if (running && value > counter) {
      interval = setInterval(() => {
        setCounter((prevTime) => prevTime + 1)
      }, 1)
    } else if (running && value < counter) {
      interval = setInterval(() => {
        setCounter((prevTime) => prevTime - 1)
      }, 1)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running, counter, value])

  useEffect(() => {
    if (value > 0) {
      setRunning(true)
    }
  }, [value])

  useEffect(() => {
    if (counter === value) {
      setRunning(false)
    }
  }, [counter, value])

  function Pix() {
    setIsModal(true)
    setSegundoComponenteAberto(true)
  }

  function BarCode() {
    setIsModalBarCode(true)
    setSegundoComponenteAbertoBarCode(true)
  }

  function Premios() {
    setIsModalPremios(true)
    setSegundoComponenteAbertoPremios(true)
  }

  function fecharSegundoComponente() {
    setSegundoComponenteAberto(false)
  }

  function fecharSegundoComponenteBarCode() {
    setSegundoComponenteAbertoBarCode(false)
  }

  function fecharSegundoComponentePremios() {
    setSegundoComponenteAbertoPremios(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        const containerElement = e.currentTarget as HTMLElement
        const clickedElement = e.target as HTMLElement
        if (containerElement === clickedElement) {
          onModalChange(false)
          onRefreshChange(true)
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTextos}>
            <p>Compra de Créditos</p>
            <p>Sua passagem para a vitória!</p>
          </div>
          <div className={styles.closeModal}>
            <Image
              src={CloseModal}
              alt=""
              onClick={() => {
                onModalChange(false)
                onRefreshChange(true)
              }}
            />
          </div>
        </div>
        <div className={styles.moedas}>
          <h4>Selecione o valor</h4>
          <div className={styles.carousel}>
            <button className={styles.prevButton} onClick={handlePrev}>
              &#8249; Anterior
            </button>
            <div className={styles.currentItem}>
              <p>{items[currentIndex]}</p>
            </div>
            <button className={styles.nextButton} onClick={handleNext}>
              Próximo &#8250;
            </button>
          </div>
        </div>
        <div className={styles.pagamento}></div>
      </div>
    </div>
  )
}

// return (
//   <main>
//     <div
//
//     >
//       <div className={styles.pageContent}>
//         <div className={styles.headerContainer}>
//           Créditos{' '}
//           <div className={styles.closeButton}>
//             <h1
//               onClick={() => {
//
//               }}
//             >
//               &#x2716;
//             </h1>
//           </div>
//         </div>
//         <h2 className={styles.selecioneOValor}>SELECIONE O VALOR</h2>
//         <div className={styles.coinContainer}>
//           <div onClick={() => setValue(1)} className={styles.amount}>
//             <p>1</p>
//           </div>
//           {user?.minrechargeLimit <= 2 && user?.maxrechargeLimit >= 2 && (
//             <div onClick={() => setValue(2)} className={styles.amount}>
//               <p>2</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 5 && user?.maxrechargeLimit >= 5 &&(
//             <div onClick={() => setValue(5)} className={styles.amount}>
//               <p>5</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 10 && user?.maxrechargeLimit >= 10 && (
//             <div onClick={() => setValue(10)} className={styles.amount}>
//               <p>10</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 20 && user?.maxrechargeLimit >= 20 && (
//             <div onClick={() => setValue(20)} className={styles.amount}>
//               <p>20</p>
//             </div>
//           )}
//           {user?.maxrechargeLimit <= 50 && user?.maxrechargeLimit >= 50 &&(
//             <div onClick={() => setValue(50)} className={styles.amount}>
//               <p>50</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 100 && user?.maxrechargeLimit >= 100 &&(
//             <div onClick={() => setValue(100)} className={styles.amount}>
//               <p>100</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 200 && user?.maxrechargeLimit >= 200 &&(
//             <div onClick={() => setValue(200)} className={styles.amount}>
//               <p>200</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 250 && user?.maxrechargeLimit >= 250 && (
//             <div onClick={() => setValue(250)} className={styles.amount}>
//               <p>250</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 300 && user?.maxrechargeLimit >= 300 && (
//             <div onClick={() => setValue(300)} className={styles.amount}>
//               <p>300</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 500 && user?.maxrechargeLimit >= 500 && (
//             <div onClick={() => setValue(500)} className={styles.amount}>
//               <p>500</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 750 && user?.maxrechargeLimit >= 750 && (
//             <div onClick={() => setValue(750)} className={styles.amount}>
//               <p>750</p>
//             </div>
//           )}
//           {user?.minrechargeLimit <= 1000 && user?.maxrechargeLimit >= 1000 && (
//             <div onClick={() => setValue(1000)} className={styles.amount}>
//               <p>1000</p>
//             </div>
//           )}
//         </div>

//         <div className={styles.value}>
//           <p>Valor Selecionado</p>
//           <p>{counter.toFixed(2)}</p>
//         </div>

//         {value == 0 && (
//           <>
//             <div className="mx-auto">
//               <p className={styles.pagamentoCartaoText}>
//                 Pagamento com boleto disponível a partir de 5.00 Créditos.
//               </p>
//             </div>
//           </>
//         )}

//         {value > 0 && (
//           <>
//             <div className="mx-auto">
//               <p className={styles.escolhaFormaText}>
//                 Escolha a forma de pagamento
//               </p>
//             </div>
//             <div className="d-flex gap-3 justify-content-center">
//               {appConfig?.pixPayment ? (
//                 <div className="cursor">
//                   <div onClick={Pix}>
//                     <Image src={PixImg.src} width={104} height={79} />
//                   </div>
//                   {isModal && segundoComponenteAberto ? <PixModal onClose={fecharSegundoComponente} onModalChange={setIsModal} /> : null}
//                 </div>
//               ) : null}

//               {value >= 5 && (
//                 <div className="cursor">
//                   <div onClick={BarCode}>
//                     <Image src={BarcodeImg.src} width={104} height={79} />
//                   </div>
//                   {isModalBarCode && segundoComponenteAbertoBarCode ? <BarcodeModal onClose={fecharSegundoComponenteBarCode} onModalChange={setIsModalBarCode} /> : null}
//                 </div>
//               )}

//               {appConfig.premiopayment ? (
//                 <div className="cursor">
//                   <div onClick={Premios} className={styles.boxPremios}>
//                     <span
//                       className={styles.notificacao}
//                       onMouseEnter={handleMouseEnter}
//                       onMouseLeave={handleMouseLeave}
//                     >{appConfig.premiopaymentperc}%</span>
//                     {isHovered && (<span className={styles.descricao}>Na compra de créditos utilizando o seu saldo de Prêmios, você recebe {appConfig.premiopaymentperc}% de cashback da sua própria compra!!</span>)}
//                     <Image
//                       src={PremiosImg.src}
//                       width={104}
//                       height={79} />
//                   </div>
//                   {isModalPremios && segundoComponenteAbertoPremios ? <PremiosModal onClose={fecharSegundoComponentePremios} onModalChange={setIsModalPremios} /> : null}
//                 </div>
//               ) : null}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   </main>
// )
