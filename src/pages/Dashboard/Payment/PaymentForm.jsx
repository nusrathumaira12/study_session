import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const {sessionId} = useParams()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const [error, setError ] = useState('')
    
const {isPending , data: sessionInfo = {} } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: async() => {
        const res = await axiosSecure.get(`/sessions/${sessionId}`)
        return res.data
    }
})

if(isPending){
    return '...loading'
}
console.log(sessionInfo)
const amount = sessionInfo.registrationFee

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)

        if(!card){
            return
        }

        const {error ,paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            setError(error.message)
        }else {
            setError('')
            console.log('payment Method', paymentMethod)

            const res = await axiosSecure.post('/create-payment-intent',{
                amount,
                sessionId
            })
            
            const clientSecret = res.data.clientSecret
            
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            })
            
            if (result.error) {
                setError(result.error.message);
                
              } else {
                setError('')
               if (result.paymentIntent.status === 'succeeded') {
                  console.log("Payment successful!");
                  console.log(result)
                 const paymentData = {
                    sessionId,
                    email: user.email,
                    amount,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    transactionId: result.paymentIntent.id
                  }

                  const paymentRes = await axiosSecure.post('/payments', paymentData);

                  
                  if(paymentRes.data.insertedId){
                    console.log('Payment Response:', paymentRes.data)

                  }
                  
                }
              }
        }





    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
<CardElement className="p-2 border rounded">
    
</CardElement>
<button type='submit' className="btn btn-primary w-full" disabled={!stripe}>
        Pay {amount}BDT</button>
        {
          error && <p className='text-red-500'>{error}</p>  
        }
            </form>
        </div>
    );
};

export default PaymentForm;