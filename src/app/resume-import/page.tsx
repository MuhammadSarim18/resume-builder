"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "components/Button";
// import Template from "components/templates/Template";
import { Templates } from "types";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  const [activeSection, setActiveSection] = useState<number>(1); // Specify the type as 'number'
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const handleSectionChange = (sectionNumber: number) => {
    setActiveSection(sectionNumber);
  };

  const handleNextClick = () => {
    if (activeSection < 3) {
      setActiveSection(activeSection + 1);
      if (activeSection === 1) {
        setCompletedSections([...completedSections, 1]);
      }
      else if (activeSection === 2) {
        setCompletedSections([...completedSections, 2]);
      }
    } else {
      setActiveSection(1);
      setCompletedSections([...completedSections, 3]);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleYesClick = () => {
    setShowPopup(true);
  };

  const handleNoClick = () => {
    // Handle the "No" button click here, if needed
    setShowCards(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  interface ResumeUploadPopupProps {
    onClose: () => void;
  }

  // Create a new component for the popup
  function ResumeUploadPopup({ onClose }: ResumeUploadPopupProps) {
    return (
      <div className="popup flex flex-col">
        <button className="self-end" onClick={onClose}>Close</button>
        {/* Your popup content */}
        <ResumeDropzone
          onFileUrlChange={onFileUrlChange}
          className="mt-5"
        />
      </div>
    );
  }
  const enteredName = document.querySelector<HTMLInputElement>('#nameInput')?.value;

  return (
    <main className="bg-[#f3f3f3] h-screen flex items-center justify-center">
      <div className="slider mx-auto p-4 w-[80%]">
        <div className="section-count flex justify-center mt-4 space-x-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={`section-number ${activeSection === index + 1
                ? 'bg-[#00c091] text-white'
                : completedSections.includes(index + 1)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded cursor-pointer hover:bg-[#00c0907e]`}
              onClick={() => handleSectionChange(index + 1)}
            >
              {index + 1}
              {completedSections.includes(index + 1) && (
                <span className="ml-1">&#10003;</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center m-5">
          {/* Add a video tag here */}
          <video
            autoPlay
            muted
            loop
            className="w-[200px] h-[200px] rounded-full"
            src="https://app.enhancv.com/af32babff9e7e0a7f3e13459a9788e8f.mp4"
          // Add other video attributes here
          ></video>
        </div>
        <div className={`section ${activeSection === 1 ? 'block' : 'hidden'}`}>
          <h1 className="text-2xl font-bold mb-4">Please enter your name</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="border rounded w-full py-2 px-3"
              id="nameInput" // Added an id to the input element
            />
          </div>
          <button
            onClick={() => {
              handleNextClick();
              // if (enteredName) {
              //   alert(`Hello, ${enteredName}! Welcome to Section 2.`);
              // }
            }}
            className="bg-[#00c091] text-white px-8 py-2 mt-4 mx-auto block rounded hover:bg-[#00c0907e]"
            style={{ width: '200px' }} // You can adjust the width as needed
          >
            Next
          </button>
        </div>

        <div className={`section ${activeSection === 2 ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-center justify-center h-full"> {/* Center the entire section */}

            <h1 className="text-2xl mb-4">Hello, {enteredName}! </h1>
            <h1 className="text-2xl mb-4">Do you have an existing resume to use as a starting point?</h1>
            <div className="flex justify-center"> {/* Center the buttons */}
              <button
                onClick={handleYesClick}
                className="bg-[#00c090aa] text-white px-4 py-2 mt-4 rounded hover:bg-[#00c091] mr-5"
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className="bg-[#8c7cdb] text-white px-4 py-2 mt-4 rounded hover:bg-[#745edb]"
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50 transition-opacity ${showPopup ? 'visible' : 'hidden'}`}>
          <div className="bg-white mx-auto my-10 p-4 rounded-lg shadow-lg z-50">
            {showPopup && (
              <ResumeUploadPopup onClose={handleClosePopup} />
            )}
          </div>
        </div>

        <div className={`section ${activeSection === 3 ? 'block' : 'hidden'}`}>
          
        </div>
        {showCards && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50 transition-opacity">
          <div className="flex flex-col bg-white mx-auto my-10 p-4 rounded-lg shadow-lg z-50">
            <button
              className="self-end p-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowCards(false)}
            >
              Close
            </button>
            <div className="flex flex-wrap justify-center">
              <Link href={"/resume-builder"}>
                <Card
                  imageSrc="https://f005.backblazeb2.com/file/github-banner-gif/template_1.png"
                  title="Template 1"
                />
              </Link>
              <Link href={"/resume-builder-2"}>
                <Card
                  imageSrc="https://f005.backblazeb2.com/file/github-banner-gif/template_2.png"
                  title="Template 2"
                />
              </Link>
              {/* Add more Card components as needed */}
            </div>
          </div>
        </div>
        
        
        )}

      </div>
    </main>

  );
}

const OrDivider = () => (
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
      <p className="font-semibold text-gray-900">{heading}</p>
      <div className="mt-5">
        <Link
          href="/resume-builder"
          className="outline-theme-blue rounded-full bg-sky-500 px-6 pb-2 pt-1.5 text-base font-semibold text-white"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};



interface CardProps {
  imageSrc: string;
  title: string;
}

// Define a Card component
const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className={`bg-white border rounded-lg p-4 m-5 shadow-lg transition-transform transform ${isHovered ? "scale-105" : "scale-100"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-56 h-80 object-cover rounded-sm mx-auto mb-2"
      />
      <h3 className="text-center text-lg font-semibold">{title}</h3>
    </div>
  );
};