"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

type BordResponseData = {
  id: string;
  name: string;
  abbr: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
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
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName");
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

  const handleBoardChange = (selectedOption: { value: string }) => {
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

  // call api to get all board id
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/boards/all"
        );
        // push all board id and name as object in array
        const boardIds = response.data.data.map((board: BordResponseData) => ({
          id: board.id,
          name: board.name,
        }));
        setBoardIds(boardIds);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      }
    };
    fetchBoards();
  }, []);

  // call api to get all sections
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/class-category/all"
        );
        // push all board id and name as object in array
        const sectionsList = response.data.data.map((section: Section) => ({
          id: section.id,
          value: section.name,
          label: section.name,
        }));
        setSectionsList(sectionsList);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      }
    };
    fetchSections();
  }, []);

  const steps = [
    {
      label: "Email",
      content: (
        <div className="">
          <h2 className="text-2xl font-bold">Hi, {fullName}</h2>
          <span>Welcome to SchoolyFied</span>
          <p className="">Let start with onboarding</p>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: e.target.value === "" });
            }}
            className="p-2 border border-gray-300 rounded-md"
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
        <div className="">
          <h1 className="text-2xl font-bold"></h1>
          <p className="">We’d love to know a bit more about your school...</p>
          <input
            type="text"
            placeholder="School Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: e.target.value === "" });
            }}
            className="p-2 border border-gray-300 rounded-md"
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
        <div className=" p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Select Your Board</h2>
          <p className="mb-4">Please select the board for your school</p>
          <Select
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
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Select Sections</h2>
          <p className="mb-4">
            Please select one or more sections for your school
          </p>
          <Select
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
        <div className="">
          <h1 className="text-2xl font-bold">welcome to SchoolyFied</h1>
          <p className="">We’d love to know a bit more about your school...</p>
          <input
            type="text"
            placeholder="8250515182"
            value={formData.contact_number}
            onChange={(e) => {
              setFormData({ ...formData, contact_number: [e.target.value] });
              setErrors({ ...errors, contact_number: e.target.value === "" });
            }}
            className="p-2 border border-gray-300 rounded-md"
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
        <div className="">
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
    try {
      // const response = await axios.post("/api/endpoint", formData);
      console.log("form datat", formData);
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-1/2 h-[80vh] flex justify-center items-center bg-white rounded-3xl shadow-xl overflow-hidden">
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
                  className="h-full bg-purple-500 rounded transition-all duration-500"
                  style={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Next/Submit Button */}
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                Submit
              </button>
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;
