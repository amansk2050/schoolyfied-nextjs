"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useCreateSchool, useGetAllSchoolSections } from "@/api/school";
import { useGetUserFromToken } from "@/api/users";
import { useGetAllBoards } from "@/api/boards";
import { useRouter } from "next/navigation";
type Class = {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type Section = {
  id: string;
  name: string;
  abbr: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  classes: Class[];
};

type SelectedSection = {
  id: string;
  value: string;
  label: string;
};
const OnboardingPage = () => {
  const router = useRouter();
  // mutations
  const createSchoolMutation = useCreateSchool();

  // custom hook to get all boards
  const getAllBoards = useGetAllBoards();

  // get all school sections
  const getAllSchoolSections = useGetAllSchoolSections();

  // // get user information from token if no user found then it will send back to register page
  const getUserFromToken = useGetUserFromToken();
  // get token from local storage, call get-me api and set full name as lastName form response
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    if (getUserFromToken.error) {
      router.push("/sign-up");
    }
    if (getUserFromToken.data) {
      setFullName(getUserFromToken.data.lastName);
    }
  }, [getUserFromToken.error, getUserFromToken.data, router]);

  const [currentStep, setCurrentStep] = useState(0);
  const [boardIds, setBoardIds] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [sectionsList, setSectionsList] = useState([
    {
      id: "",
      value: "",
      label: "",
    },
  ]);

  const handleBoardChange = (selectedOption: { value: string } | null) => {
    console.log("selectedOption :: ", selectedOption);
    const selectedBoard = boardIds.find(
      (board) => board.name === selectedOption.value
    );
    console.log("selectedBoard :: ", selectedBoard?.id);
    setFormData({
      ...formData,
      board_id: selectedBoard ? selectedBoard.id.toString() : "",
    });
    setErrors({
      ...errors,
      board_id: !selectedOption || selectedOption.value === "",
    });
  };

  const handleSectionsChange = (newValue: SelectedSection[]) => {
    console.log("newValue :: ", newValue);
    const sectionIds = newValue.map((section: SelectedSection) => section.id);
    console.log("sectionIds :: ", sectionIds);
    setFormData({ ...formData, category_id: sectionIds });
  };

  const [formData, setFormData] = useState({
    name: "",
    branch_name: "",
    email: "",
    board_id: "",
    category_id: [""],
    address: JSON.stringify({
      country: "",
      state: "",
      city: "",
      landmark: "",
      pin_code: "",
    }),
    contact_number: [""],
    is_branch: false,
  });
  const [errors, setErrors] = useState({
    name: false,
    branch_name: false,
    email: false,
    address: false,
    contact_number: false,
    board_id: false,
    category_id: false,
  });

  // handles get all boards
  useEffect(() => {
    if (getAllBoards.error) {
      toast.error("An error occurred, Getting Boards");
    }
    if (getAllBoards.data) {
      setBoardIds(getAllBoards.data.data);
    }
  }, [getAllBoards.error, getAllBoards.data]);

  // handles to get all sections
  useEffect(() => {
    if (getAllSchoolSections.error) {
      console.log("error sections");
      toast.error("An error occurred, Getting school sections");
    }
    if (getAllSchoolSections.data) {
      const sections = getAllSchoolSections.data.data;
      const sectionsList = sections.map((section: Section) => ({
        id: section.id,
        value: section.name,
        label: section.name,
      }));
      setSectionsList(sectionsList);
    }
  }, [getAllSchoolSections.error, getAllSchoolSections.data]);

  const steps = [
    {
      label: "Email",
      content: (
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl text-primary">Hi, {fullName}</h2>
          {/* <span>Welcome to SchoolyFied</span> */}
          <p className="font-semibold text-sm">
            Let start with school&apos;s official email 👋
          </p>
          <input
            type="email"
            placeholder="Type email here"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: e.target.value === "" });
            }}
            className="p-2 text-3xl font-light"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      ),
    },
    {
      label: "Name",
      content: (
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold"></h1>
          <p className="font-semibold text-sm">
            We’d love to know a bit more about your school...
          </p>
          <input
            type="text"
            placeholder="School Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: e.target.value === "" });
            }}
            className="p-2 text-3xl font-light"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      ),
    },
    {
      label: "Select board",
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">
            Please select the board for school
          </p>
          <Select
            className="p-2 text-xl font-light"
            options={boardIds.map((board) => ({
              value: board.name,
              label: board.name,
            }))}
            value={
              boardIds
                .map((board) => ({
                  value: board.id.toString(),
                  label: board.name,
                }))
                .find((option) => option.value === formData.board_id) || null
            }
            onChange={handleBoardChange}
          />
          {errors.board_id && (
            <p className="text-red-500 text-sm mt-2">Please select a board</p>
          )}
        </div>
      ),
    },
    {
      label: "Select sections",
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">
            Please select one or more sections for your school
          </p>
          <Select
            className="p-2 text-xl font-light"
            isMulti={true}
            options={sectionsList.map((section) => ({
              id: section.id,
              value: section.value,
              label: section.label,
            }))}
            value={sectionsList.filter((section) =>
              formData.category_id.includes(section.id)
            )}
            onChange={handleSectionsChange}
          />

          {errors.category_id && (
            <p className="text-red-500 text-sm mt-2">
              Please select at least one section
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Phone",
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">
            {" "}
            School primary contact number
          </p>
          <input
            className="p-2 text-3xl font-light"
            type="text"
            placeholder="Type here .. "
            value={formData.contact_number}
            onChange={(e) => {
              setFormData({ ...formData, contact_number: [e.target.value] });
              setErrors({ ...errors, contact_number: e.target.value === "" });
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      ),
    },
    {
      label: "Address",
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">School Address .. 🏫</p>
          <input
            type="text"
            placeholder="Country"
            value={JSON.parse(formData.address).country}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: JSON.stringify({
                  ...JSON.parse(formData.address),
                  country: e.target.value,
                }),
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="State"
            value={JSON.parse(formData.address).state}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: JSON.stringify({
                  ...JSON.parse(formData.address),
                  state: e.target.value,
                }),
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="City"
            value={JSON.parse(formData.address).city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: JSON.stringify({
                  ...JSON.parse(formData.address),
                  city: e.target.value,
                }),
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Landmark"
            value={JSON.parse(formData.address).landmark}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: JSON.stringify({
                  ...JSON.parse(formData.address),
                  landmark: e.target.value,
                }),
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Pin Code"
            value={JSON.parse(formData.address).pin_code}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: JSON.stringify({
                  ...JSON.parse(formData.address),
                  pin_code: e.target.value,
                }),
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    console.log("form datat", formData);
    formData.address = JSON.stringify(formData.address);
    createSchoolMutation.mutate(formData);
    router.push("/admin");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-lamaPurple to-lamaSky">
      {/* <Button className="bg-white text-black">Help</Button> */}
      <div className="w-1/2 h-[80vh] flex flex-col justify-center items-center bg-white rounded-3xl shadow-xl overflow-hidden">
        <p className="font-bold text-xl text-purpleButton ">SchoolyFied.in</p>
        <div className="h-[80%] w-full flex flex-col justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full w-full flex flex-col items-center justify-center"
          >
            {/* Card content */}
            <div className="flex-1 flex items-center justify-center p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="w-full"
              >
                {steps[currentStep].content}
              </motion.div>
            </div>

            {/* Navigation buttons and Progress bar in a row */}
            <div className="w-full flex items-center justify-center px-8 py-4 gap-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="disabled:opacity-50"
              >
                <Image
                  src="/assets/icons/nextArrow.svg"
                  width={30}
                  height={30}
                  alt="previous"
                  className="transform rotate-180"
                />
              </button>

              {/* Progress bar */}
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-purpleButton rounded transition-all duration-500"
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Next/Submit Button */}
              {currentStep === steps.length - 1 ? (
                <>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-primary hover:bg-black text-white rounded"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <button onClick={handleNext}>
                  <Image
                    src="/assets/icons/nextArrow.svg"
                    width={30}
                    height={30}
                    alt="next"
                  />
                </button>
              )}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
