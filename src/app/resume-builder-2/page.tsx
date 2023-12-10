"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume2 } from "components/Resume";
import SideNav from "components/ResumeForm/SideNav";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-2">
          <div className="hidden"><ResumeForm /></div>
            <SideNav />
          </div>
          <div className="col-span-4">
            <Resume2 />
          </div>
        </div>
      </main>
    </Provider>
  );
}
