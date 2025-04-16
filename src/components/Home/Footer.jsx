import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#10658b] text-gray-300 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* GET IN TOUCH */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">GET IN TOUCH</h3>
                    <p className="text-sm">HEAD OFFICE</p>
                    <p className="text-sm mt-1">2nd Floor, Plot 19-A, Sector 16, Main Korangi Road, Korangi Industrial Area, Karachi, 74900</p>
                    <p className="text-sm mt-2">UAN: 021-11-11-32</p>
                    <p className="text-sm mt-1">📞 +92-334-1200000</p>
                    <p className="text-sm mt-1">✉️ customercare@shopifybeast.pk</p>
                </div>

                {/* OUR COMPANY */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">OUR COMPANY</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">About Us</li>
                        <li className="hover:text-white transition">Blog</li>
                        <li className="hover:text-white transition">Our Store Locations</li>
                        <li className="hover:text-white transition">Loyalty App</li>
                        <li className="hover:text-white transition">Careers</li>
                        <li className="hover:text-white transition">FAQs</li>
                        <li className="hover:text-white transition">Refund Policy</li>
                    </ul>
                </div>

                {/* HELP */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">HELP</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">Shipping Policy</li>
                        <li className="hover:text-white transition">Returns & Exchange Policy</li>
                        <li className="hover:text-white transition">Order Cancellation Policy</li>
                        <li className="hover:text-white transition">Privacy Policy</li>
                        <li className="hover:text-white transition">Terms & Conditions</li>
                    </ul>
                </div>

                {/* CUSTOMER SUPPORT */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">CUSTOMER SUPPORT</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">How To Pay Online (Guidelines)</li>
                        <li className="hover:text-white transition">Bulk Order Form</li>
                        <li className="hover:text-white transition">Sell at Chase Value</li>
                        <li className="hover:text-white transition">Track Your Order</li>
                        <li className="hover:text-white transition">Account Login</li>
                    </ul>
                </div>
            </div>

            {/* Payment Icons */}
            <div className="mt-10 border-gray-700 pt-6 px-4 flex flex-wrap justify-center gap-6 rounded-full">
                <img src="/Images/Payment/payment_icon_1.png" alt="payment1" className="h-16 rounded-full max-sm:w-10 max-sm:h-10" />
                <img src="/Images/Payment/payment_icon_2.png" alt="payment2" className="h-16 w-15 rounded-full max-sm:w-10 max-sm:h-10" />
                <img src="/Images/Payment/payment_icon_3.png" alt="payment3" className="h-16 rounded-full max-sm:w-10 max-sm:h-10" />
                <img src="/Images/Payment/payment_icon_4.png" alt="payment4" className="h-16 rounded-full max-sm:w-10 max-sm:h-10" />
                <img src="/Images/Payment/payment_icon_5.svg" alt="payment5" className="h-16 rounded-full max-sm:w-10 max-sm:h-10" />
            </div>

            {/* Copyright */}
            <div className="mt-6 text-center text-sm text-white">
                © {new Date().getFullYear()} <i>Shopify Beast.</i> All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
