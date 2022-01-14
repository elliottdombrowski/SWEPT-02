import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CreditCardForm from "../CreditCardForm/CreditCardForm";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import '../elements.css';

//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
        },
    ],
};

//component
const PaymentComponent = (props) => {
    //history object for redirects
    let history = useHistory();

    //render
    return (
        
        //bootstrap card container
        <div id="paymentWidgetContainerCard">

            {/* header and back button */}
            <div>
                <div>
                    <div md="auto">
                        <button
                            variant="danger"
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>

            {/* body */}
            <div>

                {/* Elements Wrapper and checkout form component */}
                <Elements
                    stripe={loadStripe(props.keys.stripe)}
                    options={ELEMENTS_OPTIONS}
                >
                    <CreditCardForm />
                </Elements>
            </div>
        </div>
    );
}

export default PaymentComponent;