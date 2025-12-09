import React from "react";
import { assets } from "../assets/assets";

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Title */}
      <div className="text-center text-2xl pt-7 text-gray-500">
        <p>
          ABOUT <span>US</span>
        </p>
      </div>

      <div className="flex my-9 flex-col md:flex-row gap-12">

        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800">Our Motive</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl">WHY CHOOSE US</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 my-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
  {/* Feature 1 */}
  <div className="bg-white border cursor-pointer border-gray-300 rounded-xl shadow-md p-6 hover:bg-purple-100 transition duration-300">
    <b className="text-lg text-gray-900 mb-2 block">EFFICIENCY:</b>
    <p className="text-sm leading-relaxed">
      Streamlined appointment scheduling that fits into your busy lifestyle.
    </p>
  </div>

  {/* Feature 2 */}
  <div className="bg-white border border-gray-300 cursor-pointer rounded-xl shadow-md p-6 hover:bg-purple-100 transition duration-300">
    <b className="text-lg text-gray-900 mb-2 block">CONVENIENCE:</b>
    <p className="text-sm leading-relaxed">
      Access to a network of trusted healthcare professionals in your area.
    </p>
  </div>

  {/* Feature 3 */}
  <div className="bg-white border cursor-pointer border-gray-300 rounded-xl shadow-md p-6 hover:bg-purple-100 transition duration-300">
    <b className="text-lg text-gray-900 mb-2 block">PERSONALIZATION:</b>
    <p className="text-sm leading-relaxed">
      Tailored recommendations and reminders to help you stay on top of your health.
    </p>
  </div>
</div>

    </div>
  );
}

export default About;
