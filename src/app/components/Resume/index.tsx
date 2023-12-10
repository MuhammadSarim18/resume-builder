"use client";
import { useState, useMemo, useEffect } from "react";
import { ResumeIframeCSR, ResumeIframeCSR2 } from "components/Resume/ResumeIFrame";
import { ResumePDF } from "components/Resume/ResumePDF";
import { ResumePDF2 } from "components/Resume/ResumePDF";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "components/Resume/ResumeControlBar";
import { Form, Form2, FormSection } from "components/ResumeForm/Form";

// import './index.css'

import { FlexboxSpacer, FlexboxSpacer2 } from "components/FlexboxSpacer";
import { changeSkills, deleteSectionInFormByIdx, selectResume, selectSkills } from "lib/redux/resumeSlice";
import { DEFAULT_FONT_COLOR, DEFAULT_THEME_COLOR, ShowForm, selectFormsOrder, selectSettings, selectThemeColor } from "lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "components/fonts/NonEnglishFontsCSSLoader";
import { BulletListTextarea, Input, InputGroupWrapper, Textarea } from "components/ResumeForm/Form/InputGroup";

import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector, useSaveStateToLocalStorageOnChange, useSetInitialStore } from "lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "lib/redux/types";


import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { changeEducations, selectEducations } from "lib/redux/resumeSlice";
import type { ResumeEducation } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";

import { BaseForm } from "components/ResumeForm/Form";
import { } from "components/ResumeForm/Form/InputGroup";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";


import { selectProjects, changeProjects } from "lib/redux/resumeSlice";
import type { ResumeProject } from "lib/redux/types";


import { ProfileForm } from "../../components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "components/ResumeForm/EducationsForm";
import { ProjectsForm } from "components/ResumeForm/ProjectsForm";
import { SkillsForm } from "components/ResumeForm/SkillsForm";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { CustomForm } from "components/ResumeForm/CustomForm";
import { cx } from "lib/cx";

import { DragDropContext, Droppable, Draggable, DraggableStateSnapshot, DraggableProvided, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { Profile } from "./ResumePDF/ResumeProfile2";
import { ResumePDFBulletList } from "./ResumePDF/common";
import { Page, View } from "@react-pdf/renderer";
import { styles } from "./ResumePDF/styles";



export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );


  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);


  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();
  const themeCol = settings.themeColor || DEFAULT_THEME_COLOR;

  const showDeleteWork = workExperiences.length > 1;

  // Step 1: Retrieve the data from localStorage
  const localStorageData = localStorage.getItem('yourKey');

  // Step 2: Parse the data if needed (e.g., as JSON)
  const initialInputValue = localStorageData ? JSON.parse(localStorageData) : '';

  // Step 3: Set the data in component state
  const [inputValue, setInputValue] = useState(initialInputValue);

  // Step 4: Bind the input fields to state
  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // Step 5: Update localStorage when input values change
  useEffect(() => {
    localStorage.setItem('yourKey', JSON.stringify(inputValue));
  }, [inputValue]);


  const educations = useAppSelector(selectEducations);
  const showDeleteEdu = educations.length > 1;
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));


  const profile = useAppSelector(selectProfile);
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };



  const projects = useAppSelector(selectProjects);
  const showDelete = projects.length > 1;




  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: WorkExperiencesForm,
    educations: EducationsForm,
    projects: ProjectsForm,
    skills: SkillsForm,
    custom: CustomForm,
  };

  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);





  const [itemsOrder, setItemsOrder] = useState(Array.from(Array(workExperiences.length).keys()));
  const [eduItemsOrder, seteduItemsOrder] = useState(Array.from(Array(educations.length).keys()));


  // Update the order of items when workExperiences change
  useEffect(() => {
    seteduItemsOrder(Array.from(Array(educations.length).keys()));
  }, [educations]);

  // Update the order of items when workExperiences change
  useEffect(() => {
    setItemsOrder(Array.from(Array(workExperiences.length).keys()));
  }, [workExperiences]);

  const onDragEnd = (result: { source: DraggableStateSnapshot, destination: DraggableStateSnapshot }) => {
    if (!result.destination) return; // Dropped outside the list
    const newItemsOrder = [...itemsOrder];
    newItemsOrder.splice(result.source.index, 1);
    newItemsOrder.splice(result.destination.index, 0, itemsOrder[result.source.index]);
    setItemsOrder(newItemsOrder);


    const neweduItemsOrder = [...eduItemsOrder];
    neweduItemsOrder.splice(result.source.index, 1);
    neweduItemsOrder.splice(result.destination.index, 0, eduItemsOrder[result.source.index]);
    seteduItemsOrder(neweduItemsOrder);
  };




  const skills = useAppSelector(selectSkills);
  const { featuredSkills, descriptions } = skills;
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const {
    fontFamily,
    fontSize,
    documentSize,
  } = settings;
  settings.themeColor || DEFAULT_FONT_COLOR;
  console.log('size', fontSize)

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer maxWidth={100} className="hidden md:block" />
        <div className="relative">
          <section className="w-[100%]  md:p-[var(--resume-padding)]">
            <div className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200">
              <Page
                size={documentSize === "A4" ? "A4" : "LETTER"}
                style={{
                  ...styles.flexCol,
                  color: DEFAULT_FONT_COLOR,
                  fontFamily,
                  // fontSize: Number(fontSize) + "px",
                  fontSize: fontSize + "pt",
                }}>

                <BaseForm>
                  <div className="w-full gap-3 mb-5">
                    <div className="w-full relative text-center">
                      <Input
                        label=""
                        name="name"
                        placeholder="Sal Khan"
                        value={name}
                        onChange={handleProfileChange}
                        className={`text-3xl text-${themeColor} font-bold mb-4 outline-none text-center`}
                      />
                    </div>
                    <div className="block w-full text-center">
                      <div className="">
                        <div className="">
                          <Input
                            label=""
                            name="location"
                            placeholder="NYC, NY"
                            value={location}
                            onChange={handleProfileChange}
                            className="w-full outline-none text-center" themeColor={""} />
                        </div>
                        <Input
                          label=""
                          name="email"
                          placeholder="hello@khanacademy.org"
                          value={email}
                          onChange={handleProfileChange}
                          className="w-[300px] outline-none text-center" />
                      </div>
                      <div className="">
                        <Input
                          label=""
                          name="phone"
                          placeholder="(123)456-7890"
                          value={phone}
                          onChange={handleProfileChange}
                          className="w-full outline-none text-center" themeColor={""} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Textarea
                        label=""
                        name="summary"
                        placeholder="Entrepreneur and educator obsessed with making education free for anyone"
                        value={summary}
                        onChange={handleProfileChange}
                        className="w-full h-52" themeColor={""} />
                    </div>
                  </div>
                  <Form form='educations' addButtonText="">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="educations">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} >
                            {eduItemsOrder.map((educationIndex, idx) => {
                              const { school, degree, gpa, date, descriptions } = educations[educationIndex];

                              const handleEducationChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
                              ) => {
                                dispatch(changeEducations({ idx, field, value } as any));
                              };
                              const handleShowBulletPoints = (value: boolean) => {
                                dispatch(changeShowBulletPoints({ field: form, value }));
                              };

                              return (
                                <Draggable key={educationIndex} draggableId={`draggable-${educationIndex}`} index={idx}>
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="block"
                                    >
                                      <FormSection
                                        form="educations"
                                        idx={educationIndex}
                                        showMoveUp={educationIndex > 0}
                                        showMoveDown={educationIndex < educations.length - 1}
                                        showDelete={showDelete}
                                        deleteButtonTooltipText="Delete school"
                                      >
                                        <div className="grid grid-cols-4">
                                          <div className="col-span-4">
                                            <Input
                                              label=""
                                              name="school"
                                              placeholder="Cornell University"
                                              value={school}
                                              onChange={handleEducationChange}
                                            />
                                          </div>
                                          <div className="col-span-3">
                                            <Input
                                              label=""
                                              name="degree"
                                              placeholder="Bachelor of Science in Computer Engineering"
                                              value={degree}
                                              onChange={handleEducationChange}
                                              className="outline-none"
                                            />
                                          </div>
                                          <div className="col-span-1">
                                            <Input
                                              label=""
                                              name="gpa"
                                              placeholder="3.81"
                                              value={gpa}
                                              onChange={handleEducationChange}
                                              className="outline-none"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-span-5 text-end mr-7">
                                          <Input
                                            label=""
                                            name="date"
                                            placeholder="May 2018"
                                            value={date}
                                            onChange={handleEducationChange}
                                            className="outline-none text-end"
                                          />
                                        </div>
                                      </FormSection>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          </div>
                        )
                        }
                      </Droppable>
                    </DragDropContext>
                  </Form>
                  <Form form="workExperiences" addButtonText="">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="workExperiences">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {itemsOrder.map((orderIndex, idx) => {
                              const { company, jobTitle, date, descriptions } = workExperiences[orderIndex];
                              const handleWorkExperienceChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
                              ) => {
                                // TS doesn't support passing union type to single call signature
                                // https://github.com/microsoft/TypeScript/issues/54027
                                // any is used here as a workaround
                                dispatch(changeWorkExperiences({ idx, field, value } as any));
                              };
                              const showMoveUp = idx !== 0;
                              const showMoveDown = idx !== workExperiences.length - 1;

                              return (
                                <Draggable key={orderIndex} draggableId={`draggable-${orderIndex}`} index={idx}>
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <FormSection
                                        form="workExperiences"
                                        idx={orderIndex}
                                        showMoveUp={orderIndex > 0}
                                        showMoveDown={orderIndex < workExperiences.length - 1}
                                        showDelete={showDelete}
                                        deleteButtonTooltipText="Delete job"
                                      >
                                        <div className="w-full ">
                                          <div>
                                            <Input
                                              label=""
                                              name="company"
                                              placeholder="Khan Academy"
                                              value={company}
                                              onChange={handleWorkExperienceChange}
                                              className="w-[200px] "
                                            />
                                            <Input
                                              label=""
                                              name="jobTitle"
                                              placeholder="Software Engineer"
                                              value={jobTitle}
                                              onChange={handleWorkExperienceChange}
                                              className="w-[300px] mr-5"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-span-5 text-end">
                                          <Input
                                            label=""
                                            name="date"
                                            placeholder="Jun 2022 - Present"
                                            value={date}
                                            onChange={handleWorkExperienceChange}
                                            className="w-[100px] text-end mr-7"
                                          />
                                        </div>


                                        <BulletListTextarea
                                          label="Description"
                                          labelClassName="col-span-full"
                                          name="descriptions"
                                          placeholder="Bullet points"
                                          value={descriptions}
                                          onChange={handleWorkExperienceChange} themeColor={""} />
                                      </FormSection>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Form>
                  <Form form="projects" addButtonText="">
                    {projects.map(({ project, date, descriptions }, idx) => {
                      const handleProjectChange = (
                        ...[
                          field,
                          value,
                        ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
                      ) => {
                        dispatch(changeProjects({ idx, field, value } as any));
                      };
                      const showMoveUp = idx !== 0;
                      const showMoveDown = idx !== projects.length - 1;

                      return (
                        <FormSection
                          key={idx}
                          form="projects"
                          idx={idx}
                          showMoveUp={showMoveUp}
                          showMoveDown={showMoveDown}
                          showDelete={showDelete}
                          deleteButtonTooltipText={"Delete project"}
                        >
                          <Input
                            name="project"
                            label="Project Name"
                            placeholder="OpenResume"
                            value={project}
                            onChange={handleProjectChange}
                            labelClassName="col-span-4" themeColor={""} />
                          <div className="col-span-5 text-end">
                            <Input
                              name="date"
                              label=""
                              placeholder="Winter 2022"
                              value={date}
                              onChange={handleProjectChange}
                              labelClassName="col-span-2" themeColor={""}
                              className="w-[100px] text-end mr-7"
                            />
                          </div>
                          <BulletListTextarea
                            name="descriptions"
                            label="Description"
                            placeholder="Bullet points"
                            value={descriptions}
                            onChange={handleProjectChange}
                            labelClassName="col-span-full" themeColor={""} />

                        </FormSection>
                      );
                    })}
                  </Form>
                  <Form form="skills" >
                    <div className="col-span-full grid grid-cols-6 gap-3">
                      <div className="relative col-span-full">
                        <BulletListTextarea
                          label="Skills List"
                          labelClassName="col-span-full"
                          name="descriptions"
                          placeholder="Bullet points"
                          value={descriptions}
                          onChange={handleSkillsChange}
                          showBulletPoints={showBulletPoints}
                        />
                        <div className="absolute left-[4.5rem] top-[0.07rem]">
                          <BulletListIconButton
                            showBulletPoints={showBulletPoints}
                            onClick={handleShowBulletPoints}
                          />
                        </div>
                      </div>
                      {featuredSkills.map(({ skill, rating }, idx) => (
                        <FeaturedSkillInput
                          key={idx}
                          className="col-span-3"
                          skill={skill}
                          rating={rating}
                          setSkillRating={(newSkill, newRating) => {
                            handleFeaturedSkillsChange(idx, newSkill, newRating);
                          }}
                          placeholder={`Featured Skill ${idx + 1}`}
                          circleColor="#000"
                        />
                      ))}
                    </div>
                  </Form>
                </BaseForm>
              </Page>
            </div>
          </section>



          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>
        <ResumeControlBarBorder />
      </div >

    </>
  );
}



export const Resume2 = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const document = useMemo(
    () => <ResumePDF2 resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);






  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  // Step 1: Retrieve the data from localStorage
  const localStorageData = localStorage.getItem('yourKey');

  // Step 2: Parse the data if needed (e.g., as JSON)
  const initialInputValue = localStorageData ? JSON.parse(localStorageData) : '';

  // Step 3: Set the data in component state
  const [inputValue, setInputValue] = useState(initialInputValue);



  // Step 5: Update localStorage when input values change
  useEffect(() => {
    localStorage.setItem('yourKey', JSON.stringify(inputValue));
  }, [inputValue]);


  const educations = useAppSelector(selectEducations);
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));


  const profile = useAppSelector(selectProfile);
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };



  const projects = useAppSelector(selectProjects);
  const showDelete = projects.length > 1;


  const [itemsOrder, setItemsOrder] = useState(Array.from(Array(workExperiences.length).keys()));
  const [eduItemsOrder, seteduItemsOrder] = useState(Array.from(Array(educations.length).keys()));


  // Update the order of items when workExperiences change
  useEffect(() => {
    seteduItemsOrder(Array.from(Array(educations.length).keys()));
  }, [educations]);

  // Update the order of items when workExperiences change
  useEffect(() => {
    setItemsOrder(Array.from(Array(workExperiences.length).keys()));
  }, [workExperiences]);

  const onDragEnd = (result: { source: DraggableStateSnapshot, destination: DraggableStateSnapshot }) => {
    if (!result.destination) return; // Dropped outside the list
    const newItemsOrder = [...itemsOrder];
    newItemsOrder.splice(result.source.index, 1);
    newItemsOrder.splice(result.destination.index, 0, itemsOrder[result.source.index]);
    setItemsOrder(newItemsOrder);


    const neweduItemsOrder = [...eduItemsOrder];
    neweduItemsOrder.splice(result.source.index, 1);
    neweduItemsOrder.splice(result.destination.index, 0, eduItemsOrder[result.source.index]);
    seteduItemsOrder(neweduItemsOrder);
  };




  const skills = useAppSelector(selectSkills);
  const { featuredSkills, descriptions } = skills;
  // const form = "skills";
  // const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  const {
    fontFamily,
    fontSize,
    documentSize,
  } = settings;
  const themeCol = settings.themeColor || DEFAULT_FONT_COLOR;

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer2 maxWidth={50} className="hidden md:block" />
        <div className="relative">
          <section className="w-[100%]  md:p-[var(--resume-padding)]">
            <div style={{ backgroundColor: themeColor, width: 'full', marginTop: "10px", padding: "10px" }} />
            <div className="flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200">
              <Page
                size={documentSize === "A4" ? "A4" : "LETTER"}
                style={{
                  ...styles.flexCol,
                  color: DEFAULT_FONT_COLOR,
                  fontFamily,
                  fontSize: fontSize + "pt",
                }}>
                <BaseForm>
                  <div style={{ backgroundColor: themeColor, width: "full", padding: "10px" }}>
                    <div className="w-[50%] relative">
                      <div className="flex justify-between">
                        <div>
                          <Input
                            label=""
                            name="name"
                            placeholder="Sal Khan"
                            value={name}
                            onChange={handleProfileChange}
                            className="text-3xl font-bold mb-4 outline-none bg-transparent text-white"
                          />
                        </div>
                        <div className="block w-[40%]">
                          <div className="">
                            <Input
                              label=""
                              name="email"
                              placeholder="hello@khanacademy.org"
                              value={email}
                              onChange={handleProfileChange}
                              className="w-[300px] outline-none bg-transparent text-white"
                            />
                          </div>
                          <div className="">
                            <Input
                              label=""
                              name="phone"
                              placeholder="(123)456-7890"
                              value={phone}
                              onChange={handleProfileChange}
                              className="w-[300px] outline-none bg-transparent text-white"
                            />
                          </div>
                          <div className="">
                            <Input
                              label=""
                              name="location"
                              placeholder="NYC, NY"
                              value={location}
                              onChange={handleProfileChange}
                              className="w-[300px] outline-none bg-transparent text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Textarea
                        label=""
                        name="summary"
                        placeholder="Entrepreneur and educator obsessed with making education free for anyone"
                        value={summary}
                        onChange={handleProfileChange}
                        className="bg-transparent text-white" // Include the class here
                      />
                    </div>

                  </div>
                  {/* <Form2 form="workExperiences" themeColor={themeColor}>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="workExperiences">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
                              const handleWorkExperienceChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
                              ) => {
                                // TS doesn't support passing union type to single call signature
                                // https://github.com/microsoft/TypeScript/issues/54027
                                // any is used here as a workaround
                                dispatch(changeWorkExperiences({ idx, field, value } as any));
                              };
                              const showMoveUp = idx !== 0;
                              const showMoveDown = idx !== workExperiences.length - 1;

                              return (
                                <FormSection
                                  key={idx}
                                  form="workExperiences"
                                  idx={idx}
                                  showMoveUp={showMoveUp}
                                  showMoveDown={showMoveDown}
                                  showDelete={showDelete}
                                  deleteButtonTooltipText="Delete job"
                                >
                                  <Input
                                    label="Company"
                                    labelClassName="col-span-full"
                                    name="company"
                                    placeholder="Khan Academy"
                                    value={company}
                                    onChange={handleWorkExperienceChange}
                                  />
                                  <Input
                                    label="Job Title"
                                    labelClassName="col-span-4"
                                    name="jobTitle"
                                    placeholder="Software Engineer"
                                    value={jobTitle}
                                    onChange={handleWorkExperienceChange}
                                  />
                                  <Input
                                    label="Date"
                                    labelClassName="col-span-2"
                                    name="date"
                                    placeholder="Jun 2022 - Present"
                                    value={date}
                                    onChange={handleWorkExperienceChange}
                                  />
                                  <BulletListTextarea
                                    label="Description"
                                    labelClassName="col-span-full"
                                    name="descriptions"
                                    placeholder="Bullet points"
                                    value={descriptions}
                                    onChange={handleWorkExperienceChange}
                                  />
                                </FormSection>
                              );
                            })}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Form2>

                  <Form2 form={form} themeColor={themeColor}>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="educations">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {eduItemsOrder && eduItemsOrder.map((educationIndex2, idx) => {
                              console.log(educations[educationIndex2])
                              if (educations[educationIndex2] === undefined) {
                                dispatch(deleteSectionInFormByIdx({ form, idx }));
                                return
                              }
                              const { school, degree, gpa, date, descriptions } = educations[educationIndex2];

                              const handleEducationChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
                              ) => {
                                dispatch(changeEducations({ idx, field, value } as any));
                              };
                              const handleShowBulletPoints = (value: boolean) => {
                                dispatch(changeShowBulletPoints({ field: form, value }));
                              };

                              return (
                                <Draggable key={educationIndex2} draggableId={`draggable-${educationIndex2}`} index={idx}>
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <FormSection
                                        // key={idx}
                                        form="educations"
                                        idx={educationIndex2}
                                        showMoveUp={educationIndex2 > 0}
                                        showMoveDown={educationIndex2 < educations.length - 1}
                                        showDelete={showDelete}
                                        deleteButtonTooltipText={"Delete school"}
                                      >
                                        <Input
                                          label="School"
                                          labelClassName="col-span-4"
                                          name="school"
                                          placeholder="Cornell University"
                                          value={school}
                                          onChange={handleEducationChange} themeColor={""} />
                                        <Input
                                          label="Date"
                                          labelClassName="col-span-2"
                                          name="date"
                                          placeholder="May 2018"
                                          value={date}
                                          onChange={handleEducationChange}
                                        />
                                        <Input
                                          label="Degree & Major"
                                          labelClassName="col-span-4"
                                          name="degree"
                                          placeholder="Bachelor of Science in Computer Engineering"
                                          value={degree}
                                          onChange={handleEducationChange}
                                        />
                                        <Input
                                          label="GPA"
                                          labelClassName="col-span-2"
                                          name="gpa"
                                          placeholder="3.81"
                                          value={gpa}
                                          onChange={handleEducationChange}
                                        />
                                        <div className="relative col-span-full">
                                          <BulletListTextarea
                                            label="Additional Information (Optional)"
                                            labelClassName="col-span-full"
                                            name="descriptions"
                                            placeholder="Free paragraph space to list out additional activities, courses, awards etc"
                                            value={descriptions}
                                            onChange={handleEducationChange}
                                            showBulletPoints={showBulletPoints}
                                          />
                                          <div className="absolute left-[15.6rem] top-[0.07rem]">
                                            <BulletListIconButton
                                              showBulletPoints={showBulletPoints}
                                              onClick={handleShowBulletPoints}
                                            />
                                          </div>
                                        </div>
                                      </FormSection>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Form2>
                  <Form2 form="projects" themeColor={themeColor}>
                    {projects.map(({ project, date, descriptions }, idx) => {
                      const handleProjectChange = (
                        ...[
                          field,
                          value,
                        ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
                      ) => {
                        dispatch(changeProjects({ idx, field, value } as any));
                      };
                      const showMoveUp = idx !== 0;
                      const showMoveDown = idx !== projects.length - 1;

                      return (
                        <FormSection
                          key={idx}
                          form="projects"
                          idx={idx}
                          showMoveUp={showMoveUp}
                          showMoveDown={showMoveDown}
                          showDelete={showDelete}
                          deleteButtonTooltipText={"Delete project"}
                        >
                          <Input
                            name="project"
                            label="Project Name"
                            placeholder="OpenResume"
                            value={project}
                            onChange={handleProjectChange}
                            labelClassName="col-span-4" themeColor={""} />
                          <Input
                            name="date"
                            label="Date"
                            placeholder="Winter 2022"
                            value={date}
                            onChange={handleProjectChange}
                            labelClassName="col-span-2" themeColor={""} />
                          <BulletListTextarea
                            name="descriptions"
                            label="Description"
                            placeholder="Bullet points"
                            value={descriptions}
                            onChange={handleProjectChange}
                            labelClassName="col-span-full" themeColor={""} />
                        </FormSection>
                      );
                    })}
                  </Form2>
                  <Form2 form={'skills'} themeColor={themeColor}>
                    <div className="col-span-full grid grid-cols-6 gap-3">
                      <div className="relative col-span-full">
                        <BulletListTextarea
                          label="Skills List"
                          labelClassName="col-span-full"
                          name="descriptions"
                          placeholder="Bullet points"
                          value={descriptions}
                          onChange={handleSkillsChange}
                          showBulletPoints={showBulletPoints}
                        />
                        <div className="absolute left-[4.5rem] top-[0.07rem]">
                          <BulletListIconButton
                            showBulletPoints={showBulletPoints}
                            onClick={handleShowBulletPoints}
                          />
                        </div>
                      </div>
                      <div className="col-span-full mb-4 mt-6 border-t-2 border-dotted border-gray-200" />

                      {featuredSkills.map(({ skill, rating }, idx) => (
                        <FeaturedSkillInput
                          key={idx}
                          className="col-span-3"
                          skill={skill}
                          rating={rating}
                          setSkillRating={(newSkill, newRating) => {
                            handleFeaturedSkillsChange(idx, newSkill, newRating);
                          }}
                          placeholder={`Featured Skill ${idx + 1}`}
                          circleColor={themeColor}
                        />
                      ))}
                    </div>
                  </Form2> */}




                  <Form2 form='educations' addButtonText="" themeColor={themeColor}>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="educations">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} >
                            {eduItemsOrder.map((educationIndex, idx) => {
                              const { school, degree, gpa, date, descriptions } = educations[educationIndex];

                              const handleEducationChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
                              ) => {
                                dispatch(changeEducations({ idx, field, value } as any));
                              };
                              const handleShowBulletPoints = (value: boolean) => {
                                dispatch(changeShowBulletPoints({ field: form, value }));
                              };

                              return (
                                <Draggable key={educationIndex} draggableId={`draggable-${educationIndex}`} index={idx}>
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="block"
                                    >
                                      <FormSection
                                        form="educations"
                                        idx={educationIndex}
                                        showMoveUp={educationIndex > 0}
                                        showMoveDown={educationIndex < educations.length - 1}
                                        showDelete={showDelete}
                                        deleteButtonTooltipText="Delete school"
                                      >
                                        <div className="grid grid-cols-4">
                                          <div className="col-span-4">
                                            <Input
                                              label=""
                                              name="school"
                                              placeholder="Cornell University"
                                              value={school}
                                              onChange={handleEducationChange}
                                            />
                                          </div>
                                          <div className="col-span-3">
                                            <Input
                                              label=""
                                              name="degree"
                                              placeholder="Bachelor of Science in Computer Engineering"
                                              value={degree}
                                              onChange={handleEducationChange}
                                              className="outline-none"
                                            />
                                          </div>
                                          <div className="col-span-1">
                                            <Input
                                              label=""
                                              name="gpa"
                                              placeholder="3.81"
                                              value={gpa}
                                              onChange={handleEducationChange}
                                              className="outline-none"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-span-5 mr-7 text-end ">
                                          <Input
                                            label=""
                                            name="date"
                                            placeholder="May 2018"
                                            value={date}
                                            onChange={handleEducationChange}
                                            className="outline-none text-end"
                                          />
                                        </div>
                                      </FormSection>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          </div>
                        )
                        }
                      </Droppable>
                    </DragDropContext>
                  </Form2>
                  <Form2 form="workExperiences" addButtonText="" themeColor={themeColor}>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="workExperiences">
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {itemsOrder.map((orderIndex, idx) => {
                              const { company, jobTitle, date, descriptions } = workExperiences[orderIndex];
                              const handleWorkExperienceChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
                              ) => {
                                // TS doesn't support passing union type to single call signature
                                // https://github.com/microsoft/TypeScript/issues/54027
                                // any is used here as a workaround
                                dispatch(changeWorkExperiences({ idx, field, value } as any));
                              };
                              const showMoveUp = idx !== 0;
                              const showMoveDown = idx !== workExperiences.length - 1;

                              return (
                                <Draggable key={orderIndex} draggableId={`draggable-${orderIndex}`} index={idx}>
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <FormSection
                                        form="workExperiences"
                                        idx={orderIndex}
                                        showMoveUp={orderIndex > 0}
                                        showMoveDown={orderIndex < workExperiences.length - 1}
                                        showDelete={showDelete}
                                        deleteButtonTooltipText="Delete job"
                                      >
                                        <div className="w-full ">
                                          <div>
                                            <Input
                                              label=""
                                              name="company"
                                              placeholder="Khan Academy"
                                              value={company}
                                              onChange={handleWorkExperienceChange}
                                              className="w-[200px] "
                                            />
                                            <Input
                                              label=""
                                              name="jobTitle"
                                              placeholder="Software Engineer"
                                              value={jobTitle}
                                              onChange={handleWorkExperienceChange}
                                              className="w-[300px] mr-5"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-span-5 text-end mr-7">
                                          <Input
                                            label=""
                                            name="date"
                                            placeholder="Jun 2022 - Present"
                                            value={date}
                                            onChange={handleWorkExperienceChange}
                                            className="w-[100px] text-end"
                                          />
                                        </div>


                                        <BulletListTextarea
                                          label="Description"
                                          labelClassName="col-span-full"
                                          name="descriptions"
                                          placeholder="Bullet points"
                                          value={descriptions}
                                          onChange={handleWorkExperienceChange} themeColor={""} />
                                      </FormSection>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Form2>
                  <Form2 form="projects" addButtonText="" themeColor={themeColor}>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="project-list" direction="vertical">
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {projects.map(({ project, date, descriptions }, idx) => {
                              const handleProjectChange = (
                                ...[
                                  field,
                                  value,
                                ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
                              ) => {
                                dispatch(changeProjects({ idx, field, value } as any));
                              };

                              return (
                                <Draggable key={idx} draggableId={`project-${idx}`} index={idx}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <FormSection
                                        key={idx}
                                        form="projects"
                                        idx={idx}
                                        // showMoveUp={showMoveUp}
                                        // showMoveDown={showMoveDown}
                                        showDelete={showDelete}
                                        deleteButtonTooltipText="Delete project"
                                      >
                                        <Input
                                          name="project"
                                          label="Project Name"
                                          placeholder="OpenResume"
                                          value={project}
                                          onChange={handleProjectChange}
                                          labelClassName="col-span-4"
                                          themeColor={""}
                                        />
                                        <Input
                                          name="date"
                                          label="Date"
                                          placeholder="Winter 2022"
                                          value={date}
                                          onChange={handleProjectChange}
                                          labelClassName="col-span-2"
                                          themeColor={""}
                                        />
                                        <BulletListTextarea
                                          name="descriptions"
                                          label="Description"
                                          placeholder="Bullet points"
                                          value={descriptions}
                                          onChange={handleProjectChange}
                                          labelClassName="col-span-full"
                                          themeColor={""}
                                        />
                                      </FormSection>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Form2>

                  <Form2 form="skills" themeColor={themeColor}>
                    <div className="col-span-full grid grid-cols-6 gap-3">
                      <div className="relative col-span-full">
                        <BulletListTextarea
                          label="Skills List"
                          labelClassName="col-span-full"
                          name="descriptions"
                          placeholder="Bullet points"
                          value={descriptions}
                          onChange={handleSkillsChange}
                          showBulletPoints={showBulletPoints}
                        />
                        <div className="absolute left-[4.5rem] top-[0.07rem]">
                          <BulletListIconButton
                            showBulletPoints={showBulletPoints}
                            onClick={handleShowBulletPoints}
                          />
                        </div>
                      </div>
                      {featuredSkills.map(({ skill, rating }, idx) => (
                        <FeaturedSkillInput
                          key={idx}
                          className="col-span-3"
                          skill={skill}
                          rating={rating}
                          setSkillRating={(newSkill, newRating) => {
                            handleFeaturedSkillsChange(idx, newSkill, newRating);
                          }}
                          placeholder={`Featured Skill ${idx + 1}`}
                          circleColor={themeColor}
                        />
                      ))}
                    </div>
                  </Form2>
                </BaseForm>
              </Page>

            </div>
          </section>
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize2}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>
        <ResumeControlBarBorder />
      </div>
    </>
  );
};
