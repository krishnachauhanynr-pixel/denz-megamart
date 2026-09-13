import React, { useState } from 'react';
import { Lock, ShieldCheck, CreditCard, QrCode, Upload } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/currency';

interface CheckoutViewProps {
  onBackToHome: () => void;
}

type PaymentMethod = 'card' | 'upi';

export function CheckoutView({ onBackToHome }: CheckoutViewProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-serif text-neutral-900 mb-4">Order Confirmed</h2>
        <p className="text-neutral-500 mb-10 max-w-md mx-auto font-light">Thank you for your purchase. We have sent the confirmation details to {formData.email || 'your email'}.</p>
        <button 
          onClick={onBackToHome}
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors tracking-wide"
        >
          RETURN TO BOUTIQUE
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-neutral-900 mb-12">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
        
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <h2 className="text-xl font-serif text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2">Email address</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">Full name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">Shipping Address</label>
                  <input type="text" id="address" name="address" required value={formData.address} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900" />
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">City</label>
                  <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900" />
                </div>

                <div>
                  <label htmlFor="zip" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">Postal code</label>
                  <input type="text" id="zip" name="zip" required value={formData.zip} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-4 mt-12">
                <h2 className="text-xl font-serif text-neutral-900">Payment Method</h2>
                <div className="flex items-center text-neutral-400 text-xs font-medium uppercase tracking-wider">
                  <Lock className="h-3 w-3 mr-1.5" /> Secure
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center py-6 px-4 border ${paymentMethod === 'card' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 bg-transparent'} transition-colors`}
                >
                  <CreditCard className={`h-6 w-6 mb-2 ${paymentMethod === 'card' ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span className={`text-xs uppercase tracking-wider font-medium ${paymentMethod === 'card' ? 'text-neutral-900' : 'text-neutral-500'}`}>Credit / Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center py-6 px-4 border ${paymentMethod === 'upi' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 bg-transparent'} transition-colors`}
                >
                  <QrCode className={`h-6 w-6 mb-2 ${paymentMethod === 'upi' ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span className={`text-xs uppercase tracking-wider font-medium ${paymentMethod === 'upi' ? 'text-neutral-900' : 'text-neutral-500'}`}>UPI / QR Scanner</span>
                </button>
              </div>
              
              {paymentMethod === 'card' ? (
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="cardNumber" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">Card number</label>
                    <input type="text" id="cardNumber" name="cardNumber" required placeholder="0000 0000 0000 0000" maxLength={19} value={formData.cardNumber} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-mono" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="expiryDate" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">Expiration (MM/YY)</label>
                    <input type="text" id="expiryDate" name="expiryDate" required placeholder="MM/YY" maxLength={5} value={formData.expiryDate} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-mono" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="cvc" className="block text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2 mt-2">Security Code</label>
                    <input type="text" id="cvc" name="cvc" required placeholder="123" maxLength={4} value={formData.cvc} onChange={handleInputChange} className="block w-full border-b border-neutral-300 bg-transparent py-2 px-0 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 font-mono" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border border-neutral-200 bg-neutral-50">
                  <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-6">Scan to Pay</h3>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 mb-6 relative w-56 h-56 flex items-center justify-center overflow-hidden">
                    {!imageError ? (
                      <img 
                        src="/payment-qr.svg"
                        alt="UPI QR Code Scanner" 
                        className="w-full h-full object-contain rounded-md"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-neutral-100 text-neutral-500 border-2 border-dashed border-neutral-300 rounded-xl">
                        <Upload className="h-8 w-8 mb-2 text-neutral-400" />
                        <p className="text-xs font-medium">Image Not Found</p>
                        <p className="text-[10px] mt-1">Please add a QR image to the <strong className="text-neutral-900">public</strong> folder.</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 font-light text-center max-w-sm">
                    Open your preferred UPI app (GPay, PhonePe, Paytm) and scan this QR code to complete the payment of <strong>{formatINR(totalPrice)}</strong>.
                  </p>
                  <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-neutral-400 uppercase tracking-wider">Waiting for payment confirmation...</p>
                </div>
              )}

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center bg-neutral-900 text-white py-4 px-4 text-sm font-medium hover:bg-neutral-800 transition-colors tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      PROCESSING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      {paymentMethod === 'card' ? `PAY ${formatINR(totalPrice)}` : `I HAVE PAID ${formatINR(totalPrice)}`}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-12 lg:mt-0 lg:col-span-5">
          <div className="bg-neutral-50 p-8 sticky top-28">
            <h2 className="text-lg font-serif text-neutral-900 mb-6 border-b border-neutral-200 pb-4">In Your Bag</h2>
            
            <ul className="divide-y divide-neutral-200 mb-6 max-h-96 overflow-y-auto pr-2 hide-scrollbar">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex">
                  <img src={item.imageUrl} alt={item.name} className="h-20 w-16 object-cover bg-neutral-100" />
                  <div className="ml-4 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between text-sm font-medium text-neutral-900">
                      <h3 className="font-serif">{item.name}</h3>
                      <p className="ml-4">{formatINR(item.discountPrice * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">{item.category}</p>
                    <p className="mt-1 text-sm text-neutral-400 font-light">Qty: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="space-y-4 border-t border-neutral-200 pt-6 text-sm font-light text-neutral-600">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-neutral-900">{formatINR(totalPrice)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd className="font-medium text-neutral-900">Complimentary</dd>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-4 mt-4 text-base text-neutral-900">
                <dt className="font-medium">Total</dt>
                <dd className="font-medium">{formatINR(totalPrice)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
