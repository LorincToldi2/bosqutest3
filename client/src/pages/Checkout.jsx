import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";



import Navbar from '../components/Navbar'

import "../assets/styles/checkout.css"
import "../assets/styles/checkout2.css"

const Checkout = () => {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])

    const [userName, setUserName ] = useState("")
    const [email, setEmail] = useState()

    const [orderPrice, setOrderPrice] = useState(0)

    const [ listOfCart, setListOfCart ] = useState([])

    useEffect(() => {
      const verifyUser = async () => {
          if(!cookies.jwt) {
              /* navigate("/login")  */
          } else {
              const { data } = await axios.post(
                  "http://localhost:4003",
                  {},
                  {
                      withCredentials: true,
                  }
              )

              const username = data.name.split(' ')[0]
              setUserName(username)
              setEmail(data.email)

              axios.get('http://localhost:4003/getCart').then((response) => {
          
              const listOfCartCurrent = []

              console.log(listOfCartCurrent)

              


              response.data.forEach((product) => {
                  if(product.email == data.email ){
                      listOfCartCurrent.push(product)
                  }
              })

              if(listOfCartCurrent.length == 0) {
               navigate("/")
            }

          console.log(listOfCartCurrent)
          setListOfCart(listOfCartCurrent)

          var priceCurrent = 0

          listOfCartCurrent.forEach(object => {
            priceCurrent = priceCurrent + object.product.price
          })

          
          setOrderPrice(priceCurrent)

      })

              

              if (!data.status) {
                  removeCookie("jwt")
                  /* navigate("/login") */
              } else {
              }
          }
      }
      verifyUser()

      
  }, [cookies, navigate, removeCookie])


  const [fullName, setFullName] = useState()
  const [providedEmail, setProvidedEmail] = useState()
  const [phone, setPhone] = useState()
  const [megye, setMegye] = useState()
  const [varos, setVaros] = useState()
  const [cim, setCim] = useState()


  function handleCheckout () {


    if(!fullName || !providedEmail || !phone || !megye || !varos || !cim) {
      
      toast.error("K??rem ne hagyjon kit??ltetlen mez??t!", {
        theme: "dark",
      }
      )
    } else {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      
      var newDate = year + "/" + month + "/" + day;

      axios.post("http://localhost:4003/deleteCartItems",{
        email: email
      })

      axios.post("http://localhost:4003/order", {
              products: listOfCart, 
              email: email,
              status: 'pending',
              orderDate: newDate,
              fullName: fullName,
              providedEmail: providedEmail,
              phone: phone,
              megye: megye,
              varos: varos,
              cim: cim
          }).then((response) => {
            
          })
    }

    
  }

  return (
    <>
      <Navbar account_name={userName} />
      <ToastContainer />
      <main className='main'>
      <div className="pt_checkout checkout-body">
         <div className="page-wrapper js-wrapper-padding">
            <div className="site-content shipping">
               <div className="site-wrapper">
                  <div className="column-wrapper">
                     <div className="primary-content">
                       
                           <fieldset className="js-checkout-panel-wrapper checkout-panel-address is-active">
                              <legend className="js-checkout-panel-title text-uppercase">
                                 
                                 <span className="checkout-panel-selected checkout-right"></span>
                                 <h2 className="checkout-panel-title-name h2"><i className="checkout-panel-icon"
                                    aria-hidden="true"></i>Sz??ll??t??si adatok</h2>

                                 
                              </legend>
                              <div className="js-checkout-panel js-first-checkout-panel box-padding-medium ">
                                 <div className="js-address-option ">
                                    <span className="required-indicator"><span className="required-asterisk"></span>
                                    <em>K??telez?? mez??k</em></span>
                                 </div>
                                 <div className="js-shippingaddress-container ">
                                    <div className=" f-field-textinput f-type-firstname f-state-required f-field"
                                       data-required-text="Required field">
                                       <label className="f-label">
                                       <span className="f-label-value">Teljes N??v</span>
                                       <span className="f-required-marker">
                                       <span aria-hidden="true">*</span>
                                       </span>
                                       </label>
                                       <div className="f-field-wrapper">
                                          <input onChange={(e) => setFullName(e.target.value)} type="text"
                                             className="f-textinput firstName f-state-required f-validate-regexp input input-new"
                                             placeholder="K??rem adja meg teljes nev??t!" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="js-shippingaddress-container ">
                                    <div className=" f-field-textinput f-type-firstname f-state-required f-field"
                                       data-required-text="Required field">
                                       <label className="f-label">
                                       <span className="f-label-value">Email c??m</span>
                                       <span className="f-required-marker">
                                       <span aria-hidden="true">*</span>
                                       </span>
                                       </label>
                                       <div className="f-field-wrapper">
                                          <input onChange={(e) => setProvidedEmail(e.target.value)} type="text"
                                             className="f-textinput firstName f-state-required f-validate-regexp input input-new"
                                             placeholder="K??rem adja meg Email c??m??t!" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="js-shippingaddress-container ">
                                    <div className=" f-field-textinput f-type-firstname f-state-required f-field"
                                       data-required-text="Required field">
                                       <label className="f-label">
                                       <span className="f-label-value">Telefonsz??m</span>
                                       <span className="f-required-marker">
                                       <span aria-hidden="true">*</span>
                                       </span>
                                       </label>
                                       <div className="f-field-wrapper">
                                          <input onChange={(e) => setPhone(e.target.value)} type="text"
                                             className="f-textinput firstName f-state-required f-validate-regexp input input-new"
                                             placeholder="K??rem adja meg telefonsz??m??t!" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="js-shippingaddress-container ">
                                    <div className=" f-field-textinput f-type-firstname f-state-required f-field"
                                       data-required-text="Required field">
                                       <label className="f-label">
                                       <span className="f-label-value">Megye</span>
                                       <span className="f-required-marker">
                                       <span aria-hidden="true">*</span>
                                       </span>
                                       </label>
                                       <div className="f-field-wrapper">
                                          <input onChange={(e) => setMegye(e.target.value)} type="text"
                                             className="f-textinput firstName f-state-required f-validate-regexp input input-new"
                                             placeholder="K??rem adja meg a v??lasztott megy??t!" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="js-shippingaddress-container ">
                                    <div className=" f-field-textinput f-type-firstname f-state-required f-field"
                                       data-required-text="Required field">
                                       <label className="f-label">
                                       <span className="f-label-value">V??ros</span>
                                       <span className="f-required-marker">
                                       <span aria-hidden="true">*</span>
                                       </span>
                                       </label>
                                       <div className="f-field-wrapper">
                                          <input onChange={(e) => setVaros(e.target.value)} type="text"
                                             className="f-textinput firstName f-state-required f-validate-regexp input input-new"
                                             placeholder="K??rem adja meg a v??lasztott v??rost!" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="js-shippingaddress-container ">
                                    <div className=" f-field-textinput f-type-firstname f-state-required f-field"
                                       data-required-text="Required field">
                                       <label className="f-label">
                                       <span className="f-label-value">Utca, h??zsz??m</span>
                                       <span className="f-required-marker">
                                       <span aria-hidden="true">*</span>
                                       </span>
                                       </label>
                                       <div className="f-field-wrapper">
                                          <input onChange={(e) => setCim(e.target.value)} type="text"
                                             className="f-textinput firstName f-state-required f-validate-regexp input input-new"
                                             placeholder="K??rem adja meg a v??lasztott utc??t!" />
                                       </div>
                                    </div>
                                 </div>
                                 <div
                                    className="f-field f-field-button clearfix mobile-clear-both js-address-actions ">
                                    <button type='button' onClick={handleCheckout}
                                       className="js-find-address btn-primary find-address baseline-small btn-black">
                                    Rendel??s v??gleges??t??se
                                    </button>
                                 </div>
                              </div>
                           </fieldset>
                     </div>
                     <div className="secondary-content summary">
                        <div className="order-summary baseline-medium">
                           <Link to="/bag">
                           <a className="section-header-note checkout-right">M??dos??t??s
                           
                           <span className="visuallyhidden">Order</span></a>
                           </Link>
                           <header className="box-border-bottom">
                              <h3 className="section-header h4 baseline-small">
                                 Rendel??s ??sszegz??
                              </h3>
                           </header>
                           {
                             listOfCart.map(object => {
                               return (
                                <div className="checkout-mini-cart js-checkout-mini-cart">
                                    <div className="checkout-mini-cart-inner">
                                      <div className="mini-cart-product js-mini-cart-product">
                                          <div className="mini-cart-image fluid-width">
                                            <picture className="content-picture">
                                                <img src={object.product.photos[0]}
                                                  className="content-image js-producttile_image" />
                                            </picture>
                                          </div>
                                          <div className="mini-cart-details">
                                            <div className="mini-cart-name baseline-small">
                                                <span>{object.product.title}</span>
                                            </div>
                                            <div className="mini-cart-attributes">
                                                <div className="attribute">
                                                  <span className="label bold ">
                                                  <span>Sz??n</span>
                                                  <span className="size-colons-holder">:</span>
                                                  </span>
                                                  <span className="value">
                                                  {object.product.colorName}
                                                  </span>
                                                </div>
                                                <div className="attribute">
                                                  <span className="label bold attribute-label-size">
                                                  <span>M??ret</span>
                                                  <span className="size-colons-holder">: </span>
                                                  </span>
                                                  <span className="value">
                                                  {object.selectedSize}
                                                  </span>
                                                </div>
                                                <span
                                                  className="hide js-rrparent js-product-1005325-1A03718_AA2_46_5V030__"></span>
                                            </div>
                                            <div className="mini-cart-pricing">
                                                <span className="label">Price</span>
                                                <span
                                                  className="value mini-cart-price price-adjusted product-sales-price | text-uppercase" style={{textTransform: "none"}}><span
                                                  className="was-now"></span>
                                                {object.product.price} Ft</span>
                                            </div>
                                            <div className="mini-cart-actions">
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                               )
                             })
                           }
                           <div className="checkout-order-totals js-checkout-order-totals">
                              <table className="order-totals-table baseline-medium">
                                 <tbody>
                                    <tr className="order-subtotal">
                                       <th scope="row">R??sz??sszeg</th>
                                       <td className="text-right">
                                        {orderPrice} Ft
                                       </td>
                                    </tr>
                                    <tr className="order-shipping js-shipping" >
                                       <th scope="row">
                                          Sz??ll??t??s
                                       </th>
                                       <td className="text-right">
                                          2000 Ft
                                       </td>
                                    </tr>
                                    <tr className="order-total">
                                       <th scope="row">??sszesen</th>
                                       <td className="text-right js-order-total">
                                          {orderPrice + 2000} Ft
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </main>
    
    </>
  )
}

export default Checkout