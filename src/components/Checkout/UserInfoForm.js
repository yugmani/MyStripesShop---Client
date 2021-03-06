import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import '../../stylesheets/UserInfoForm.scss';
import { CartContext } from '../../utils/CartContext';
import { Link } from 'react-router-dom';
import Payment from './CheckoutForm';

const UserInfoForm = () => {

    const { register, handleSubmit } = useForm();
    const { cart } = useContext(CartContext);
    const [userInfo, setUserInfo] = useState();
    const [filledOut, setFilledOut] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    const onSubmit = data => {
        console.log('cart', cart);
        console.log('data', data);
        setUserInfo(data);
        setFilledOut(true);
    };
    const formInputs = ['Address', 'Apartment, suite, etc. (optional)', 'City']

    const Inputs = () => {
        return (
            <>
                {formInputs.map((inputStr, index) => (
                    <input
                        type='text'
                        placeholder={inputStr}
                        name={inputStr.toLowerCase().replace(/[, ]+/g, "").replace(/[()]/g, '').trim()}
                        ref={register}
                        key={index}
                    />
                ))}
            </>
        )
    }

    const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona",
        "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", " North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

    document.body.onclick = function () {
        console.log(userInfo);
        // console.log(userInfo.apartmentsuiteetc.optional);
    }

    const goBackToForm = () => {
        setFilledOut(false);
    }

    const displayCheckoutForm = () => {
        setShowCheckoutForm(true);
    }

    return (
        <>
            {!filledOut &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Contact Information</h3>
                    <input type='text' placeholder='Email' name='email' ref={register} />
                    <h3>Shipping Address</h3>
                    <div className='name-div'>
                        <input type='text' placeholder='First name (optional)' className='name first-name' name='firstName' ref={register} />
                        <input type='text' placeholder='Last name' className='name last-name' name='lastName' ref={register} />
                    </div>
                    <Inputs />
                    <div className='name-div'>
                        <select name='country' defaultValue='' ref={register} className='country-select' required>
                            <option value="" disabled hidden>Country/Region</option>
                            <option value="United States">United States</option>
                        </select>
                        <select name='state' defaultValue='' className='state-select' ref={register} required>
                            <option value="" disabled hidden>State</option>
                            {states.map((state, index) => (
                                <option value={state} key={index}>{state}</option>
                            ))}
                        </select>
                        <input type='text' placeholder='ZIP code' className='zip' name='zipCode' ref={register} />
                    </div>
                    <input type='text' placeholder='Phone' className='name' name='phone' ref={register} />
                    <div className='button-div'>
                        <Link to='/Cart' className='back-btn'>
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            Return to cart
                    </Link>
                        <button type='submit' className='ship-btn'>Continue to shipping</button>
                    </div>
                </form>
            }
            {filledOut && !showCheckoutForm &&
                <section className='user-info-filled-container'>
                    <section className='user-contact-ship-info'>
                        <section className='contact-div'>
                            <p>Contact: </p>
                            <p className='user-email'>{userInfo.email}</p>
                            <p className='back-to-form' onClick={goBackToForm}>Change</p>
                        </section>
                        {/* destructure userInfo somehow... */}
                        <section className='ship-div'>
                            <p>Ship to: </p>
                            <p className='user-ship-info'>{userInfo.address}, {userInfo.apartmentsuiteetc.optional && '#' + userInfo.apartmentsuiteetc.optional + ', '}{userInfo.city}, {userInfo.state}, {userInfo.zipCode}, {userInfo.country}</p>
                            <p className='back-to-form' onClick={goBackToForm}>Change</p>
                        </section>
                    </section>
                    <section>
                        <h2>Shipping Method</h2>
                        <form className='shipping-methods'>
                            <input type="radio" className="standard" name="standard" value="standard" style={{ position: 'relative', top: '-9px', right: '8px' }} />
                            <label for="standard" className="standard" style={{ width: '90%' }}>Standard Shipping (Arrives 7-10 business days after it has shipped - allow 1-2 business days to ship)</label>
                            <label for="standard" className="standard-price">$3.95</label>
                            <br></br>
                            <input type="radio" className="two-day" name="two-day" value="two-day" style={{ position: 'relative', top: '-9px', right: '8px' }} />
                            <label for="two-day" className="two-day" style={{ width: '90%' }}>2-Day Shipping (Arrives 2 business days after it has shipped - allow 1-2 business days to ship) Not Available for PO BOX/APO/FPO</label>
                            <label for="two-day" className="two-day-price">$8.00</label>
                            <br></br>
                            <input type="radio" className="next-day" name="next-day" value="next-day" style={{ position: 'relative', top: '-9px', right: '8px' }} />
                            <label for="next-day" className="next-day" style={{ width: '90%' }}>UPS Next Day Air (Arrives 1 business day after it has shipped - allow 1-2 business days to ship) Not Available for PO BOX/APO/FPO</label>
                            <label for="next-day" className="next-day-price">$19.99</label>
                        </form>
                    </section>
                    <div className='button-div'>
                        <p onClick={goBackToForm} className='back-btn'>
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            Return to Information
                            </p>
                        <button type='button' onClick={displayCheckoutForm} className='pay-btn'>Continue to payment</button>
                    </div>
                </section>
            }
            {showCheckoutForm &&
                <Payment />
            }
        </>
    )
}


export default UserInfoForm;