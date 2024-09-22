import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Tooltip } from "@nextui-org/react";
import BackgroundWallpaper from "./BackgroundWallpaper";
import { SlCalender } from "react-icons/sl";
import { IoBarChart } from "react-icons/io5";
import { BsFillSunFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { TbBrandDisney } from "react-icons/tb";
import { SiPrimevideo } from "react-icons/si";
import { RiNetflixFill } from "react-icons/ri";
import { AiOutlineOpenAI } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";
import { FaApplePay } from "react-icons/fa";
import { SiAdobe } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const subscriptions = [
  { name: "ChatGPT", icon: AiOutlineOpenAI, cost: 27.52, day: 2 },
  { name: "Netflix", icon: RiNetflixFill, cost: 15.99, day: 15 },
  { name: "Prime", icon: SiPrimevideo, cost: 14.99, day: 5 },
  { name: "Disney+", icon: TbBrandDisney, cost: 7.99, day: 20 },
  { name: "Spotify", icon: BsSpotify, cost: 9.99, day: 1 },
  { name: "ApplePay", icon: FaApplePay, cost: 14.99, day: 2 },
  { name: "Adobe", icon: SiAdobe, cost: 7.99, day: 2 },
  { name: "Twitter", icon: FaXTwitter, cost: 19.99, day: 2 },
];

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const months = [
  "JANUARY",
  "FEBUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const SubscriptionRing = ({ subscriptions, isDarkTheme }) => {
  const totalCost = subscriptions.reduce((sum, sub) => sum + sub.cost, 0);
  let startAngle = 0;
  const radius = 40;
  const strokeWidth = 8;
  const gap = 13; // Degrees of gap between segments

  return (
    <div
      className={`w-full max-w-md mx-auto ${
        isDarkTheme ? "text-white" : "text-gray-800"
      }`}
    >
      <div className="relative">
        <svg
          viewBox="-20 -20 140 140"
          className="w-full h-auto"
        >
          {subscriptions.map((sub, index) => {
            const percentage = sub.cost / totalCost;
            const segmentAngle = percentage * 360 - gap;
            const endAngle = startAngle + segmentAngle;

            const x1 = 50 + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + radius * Math.sin((endAngle * Math.PI) / 180);

            const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${
              segmentAngle > 180 ? 1 : 0
            } 1 ${x2} ${y2}`;

            // Calculate position for the icon
            const iconAngle = startAngle + segmentAngle / 2;
            const iconX =
              50 + (radius + 10) * Math.cos((iconAngle * Math.PI) / 180);
            const iconY =
              50 + (radius + 10) * Math.sin((iconAngle * Math.PI) / 180);

            startAngle = endAngle + gap;

            return (
              <React.Fragment key={sub.name}>
                <path
                  d={path}
                  fill="none"
                  stroke={`${isDarkTheme ? "#fff" : "#000"}`}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <foreignObject
                  x={iconX - 5}
                  y={iconY - 5}
                  width="10"
                  height="10"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <sub.icon size={8} />
                  </div>
                </foreignObject>
              </React.Fragment>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-sm">Monthly Spend</div>
          <div className="text-3xl font-bold">${totalCost.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showDetails, setShowDetails] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const totalMonthlySpend = subscriptions.reduce(
    (sum, sub) => sum + sub.cost,
    0
  );

  const handleDayClick = (day, subsForDay) => {
    setSelectedDay(day);
    setIsTooltipOpen(true);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty grid spaces before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-12"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const subsForDay = subscriptions.filter((sub) => sub.day === day);
      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDayClick(day, subsForDay)}
          className={`w-12 lg:w-16 aspect-square flex flex-col items-center justify-between rounded-2xl ${
            isDarkTheme
              ? "text-gray-100 bg-[#1c1c1c]"
              : "text-gray-800 bg-gray-200"
          } p-2 cursor-pointer`}
        >
          {subsForDay.slice(0, 1).map((sub) => (
            <span
              key={sub.name}
              className="text-xs flex items-center"
            >
              <sub.icon size={22} />
              {subsForDay.length > 1 && (
                <span className="text-xs ml-1">...</span>
              )}
            </span>
          ))}
          <span className="text-xs">{day}</span>
        </motion.div>
      );
    }

    return days;
  };

  const renderSubDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`mt-4 w-full p-5 rounded-md md:h-auto h-[500px] overflow-auto ${
        isDarkTheme
          ? "bg-[#000000] bg-opacity-30 text-white"
          : "bg-[#cecece] bg-opacity-30 text-gray-800"
      }`}
    >
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <SubscriptionRing
            subscriptions={subscriptions}
            isDarkTheme={isDarkTheme}
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h3 className="text-xl font-bold mb-4">Subscription Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.name}
                className="flex justify-between items-center p-2 rounded-lg bg-opacity-10 bg-gray-500"
              >
                <span className="flex items-center gap-2">
                  <sub.icon size={20} />
                  <span className="font-medium text-sm md:text-lg">
                    {sub.name}
                  </span>
                </span>
                <span className="font-bold text-sm md:text-base">
                  ${sub.cost.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <BackgroundWallpaper isDark={isDarkTheme}>
      <div className="relative w-screen h-screen flex items-center justify-center">
        <motion.div
          className="absolute top-4 right-4 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkTheme ? (
            <BsFillSunFill
              size={40}
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              color="#F5D269"
            />
          ) : (
            <FaRegMoon
              size={40}
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              color="#000"
            />
          )}
        </motion.div>
        <div className="hidden lg:flex absolute right-1 bottom-0 flex-col justify-center mb-4 cursor-pointer">
          {months.map((month, index) => {
            const scale =
              1 + Math.max(0, 0.1 - Math.abs(currentMonth - index) * 0.03);
            const colorIntensity = Math.min(
              1,
              Math.abs(currentMonth - index) * 0.4
            );
            const color = `rgb(${255 - colorIntensity * 255}, ${
              255 - colorIntensity * 255
            }, ${255 - colorIntensity * 255})`;

            return (
              <motion.div
                key={month}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`mx-1 px-4 py-2 text-base font-bold transition-all Z-50 duration-700`}
                style={{ transform: `scale(${scale})`, color }}
                onClick={() => setCurrentMonth(index)}
              >
                {month}
              </motion.div>
            );
          })}
        </div>
        <div
          className={`absolute bottom-2 right-1 p-2 rounded-full flex lg:hidden transition-all shadow-lg ${
            isDarkTheme
              ? "text-white bg-[#1c1c1c]"
              : "text-gray-800 bg-gray-300"
          }`}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? (
            <IoIosArrowDown size={40} />
          ) : (
            <IoIosArrowUp size={40} />
          )}
        </div>
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                isDarkTheme
                  ? "text-white bg-[#575757]"
                  : "text-gray-800 bg-gray-300"
              } lg:hidden absolute right-1 bottom-14 flex-col justify-center mb-4 rounded-lg transition-all z-50`}
            >
              <div className="flex flex-col">
                {months.map((month, index) => {
                  const scale =
                    1 +
                    Math.max(0, 0.1 - Math.abs(currentMonth - index) * 0.03);
                  const colorIntensity = Math.min(
                    1,
                    Math.abs(currentMonth - index) * 0.4
                  );
                  const color = `rgb(${255 - colorIntensity * 255}, ${
                    255 - colorIntensity * 255
                  }, ${255 - colorIntensity * 255})`;

                  return (
                    <motion.div
                      key={month}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`mx-1 px-2 py-1 text-base font-bold transition-all Z-50 duration-700`}
                      style={{ transform: `scale(${scale})`, color }}
                      onClick={() => setCurrentMonth(index)}
                    >
                      {month}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="w-full max-w-4xl mx-auto">
          <div
            className={` blur-sm absolute top-0 left-0 w-full h-full rounded-2xl z-10`}
          ></div>
          <div className="flex justify-center w-full">
            <CardHeader className="flex md:w-[55%] lg:w-[60%] justify-between items-center p-4 z-30">
              <h2
                className={`text-2xl lg:text-3xl font-bold ${
                  isDarkTheme ? "text-white" : "text-gray-800"
                }`}
              >
                {months[currentMonth]} {currentYear}
              </h2>
              <div
                className={`flex items-center space-x-4 ${
                  isDarkTheme ? "text-white " : "text-gray-800"
                }`}
              >
                <span>
                  Monthly Spend: $
                  {subscriptions
                    .reduce((sum, sub) => sum + sub.cost, 0)
                    .toFixed(2)}
                </span>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? (
                    <SlCalender size={24} />
                  ) : (
                    <IoBarChart size={24} />
                  )}
                </motion.div>
              </div>
            </CardHeader>
          </div>
          <CardBody className="p-4 z-30 overflow-hidden">
            <AnimatePresence mode="wait">
              {showDetails ? (
                renderSubDetails()
              ) : (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="flex justify-center">
                    <div className="w-fit">
                      <div className="grid grid-cols-7 gap-2 mb-2 text-gray-400">
                        {weekdays.map((day) => (
                          <div
                            key={day}
                            className={`${
                              isDarkTheme ? "bg-gray-500" : "bg-gray-700"
                            } rounded-3xl text-center font-semibold py-1`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 mt-7 gap-1 lg:gap-2">
                        {renderCalendar()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardBody>
        </Card>

        <AnimatePresence>
          {isTooltipOpen && selectedDay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-0 flex items-center justify-center z-50`}
              onClick={() => setIsTooltipOpen(false)}
            >
              <div
                className={`max-h-48 min-w-56 overflow-y-auto ${
                  isDarkTheme
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300 text-gray-800"
                } rounded-md p-5`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold mb-2">
                  {months[currentMonth]} {selectedDay}
                </h3>
                {subscriptions.filter((sub) => sub.day === selectedDay).length >
                0 ? (
                  subscriptions
                    .filter((sub) => sub.day === selectedDay)
                    .map((sub) => (
                      <div
                        key={sub.name}
                        className="flex justify-between items-center mb-2"
                      >
                        <span className="flex items-center gap-3 justify-center">
                          <sub.icon className="inline-block" />
                          <span>{sub.name}</span>
                        </span>
                        <span className="p-1">${sub.cost.toFixed(2)}</span>
                      </div>
                    ))
                ) : (
                  <div>No subscriptions due on this day</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BackgroundWallpaper>
  );
};

export default SubscriptionCalendar;
