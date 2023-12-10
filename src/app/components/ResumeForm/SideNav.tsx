import Link from "next/link";
import React, { FC, useState } from "react";
import { Form } from "components/ResumeForm/Form";
import { ThemeForm } from "./ThemeForm";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectShowByForm } from "lib/redux/settingsSlice";

interface SideNavProps {
  // Define any props you may need here
}

interface PopupProps {
  onClose: () => void;
}




const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formWork = 'workExperiences';

  const formEdu = 'educations';

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // function dispatch(arg0: any) {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50  ">
      <div className="bg-white p-4 rounded-lg shadow-lg ">
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50 transition-opacity overflow-auto h-screen">
          <div className="flex flex-col bg-white mx-auto my-10 p-4 rounded-lg shadow-lg z-50">
            {/* <button
              className="self-end bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onClose}
            > */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 self-end cursor-pointer" onClick={onClose}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {/* </button> */}
            <div className="flex flex-wrap justify-center">
              <div onClick={toggleExpand} className="flex w-full">
                <Form form="workExperiences" addButtonText="Add Job">
                  <img width={100} src="https://github-banner-gif.s3.us-east-005.backblazeb2.com/template_1.png" />
                </Form>
                <Form form="educations" addButtonText="Add Education">
                  <img width={100} src="https://github-banner-gif.s3.us-east-005.backblazeb2.com/template_1.png" />
                </Form>
                <Form form="projects" addButtonText="Add Project">
                  <img width={100} src="https://github-banner-gif.s3.us-east-005.backblazeb2.com/template_1.png" />
                </Form>
                <Form form="skills" addButtonText="Add Skills">
                  <img width={100} src="https://github-banner-gif.s3.us-east-005.backblazeb2.com/template_1.png" />
                </Form>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const SideNav: React.FC<SideNavProps> = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const [isThemeFormOpen, setIsThemeFormOpen] = useState(false);

  const openThemeForm = () => {
    setIsThemeFormOpen(true);
  };

  const closeThemeForm = () => {
    setIsThemeFormOpen(false);
  };





  return (
    <div className=" py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="block bg-[#fff] shadow-lg p-5 m-5 text-[#6c7477] rounded-lg">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-[#00c091] mb-3" onClick={openPopup}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>Add Section</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-[#00c091] mb-3" onClick={openSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
            <span>Templates</span>
          </button>
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:text-[#00c091] mb-3" onClick={openThemeForm}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25L12.75 9" />
            </svg>
            <span>Design</span>
          </button>
        </div>
        {isPopupVisible && <Popup onClose={closePopup} />}
      </div>
      {isThemeFormOpen && (
        <ThemeDisForm onClose={closeThemeForm} />
      )}
    </div>
  );
};

export default SideNav;


interface CardProps {
  imageSrc: string;
  title: string;
}

// Define a Card component



interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-10 shadow-lg w-64 bg-white h-screen transition-transform duration-300 transform overflow-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex justify-end p-4">
        <button
          className="text-gray hover:text-gray-400 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="flex flex-col mx-auto my-10 p-4 rounded-lg z-50">
        <div className="flex flex-wrap justify-center">
          <Link href={"/resume-builder"}>
            <div className="border rounded-lg p-4 m-2 transition-transform transform">
              <img
                src="https://f005.backblazeb2.com/file/github-banner-gif/template_1.png"
                alt="Template 1"
                className="w-56 h-auto object-contain rounded-sm mx-auto mb-2"
              />
              <h3 className="text-center text-lg font-semibold">Template 1</h3>
            </div>
          </Link>
          <Link href={"/resume-builder-2"}>
            <div className="border rounded-lg p-4 m-2 transition-transform transform">
              <img
              src="https://f005.backblazeb2.com/file/github-banner-gif/template_2.png"
                alt="Template 2"
                className="w-56 h-auto object-contain rounded-sm mx-auto mb-2"
              />
              <h3 className="text-center text-lg font-semibold">Template 2</h3>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};


interface ThemeFormProps {
  onClose: () => void;
}

const ThemeDisForm: FC<ThemeFormProps> = ({ onClose }) => {

  return (
    <div className="flex flex-col">
      <button className="self-end" onClick={onClose}>
        Close
      </button>
      <ThemeForm />
    </div>
  );
};