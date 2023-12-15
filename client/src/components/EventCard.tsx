import React from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

dayjs.extend(isBetween);

interface EventCardProps {
  event: any;
  onEdit?: () => void;
  onDelete?: () => void;
  showButtons: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onEdit,
  onDelete,
  showButtons,
}) => {
  const currentDate = dayjs();
  const eventDate = dayjs(event.date);
  const formattedDate = eventDate.format("MMM DD, YYYY");
  const isSoon = eventDate.isBetween(
    currentDate.subtract(1, "day"),
    currentDate.add(7, "day"),
    null,
    "[]"
  );

  const labelColor = isSoon
    ? "bg-red-300 dark:bg-red-500 text-red-900 dark:text-red-100"
    : "bg-yellow-300 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-100";

  return (
    <div className="flex flex-col bg-gradient-to-r from-indigo-500 to-purple-700 dark:white dark:to-purple-900 shadow-2xl p-2 rounded-lg mb-6 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 ${labelColor} px-2 py-1 rounded-bl font-semibold text-xs uppercase tracking-widest`}
        >
          {isSoon ? "Soon" : "Upcoming"}
        </div>
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          {event.title}
        </h2>
        <div className="text-gray-700 dark:text-gray-400 mb-3 leading-relaxed">
          <p>{event.description}</p>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <CalendarIcon className="w-5 h-5 mr-2" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {event.location}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <ClockIcon className="w-5 h-5 mr-2" />
          {event.startTime} - {event.endTime}
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-2 flex-grow">
          <a
            href={event.ticketLink}
            className="flex-grow text-center bg-green-500 dark:bg-green-500 text-white py-2 rounded shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Tickets
          </a>
          {showButtons && (
            <>
              <button
                onClick={onEdit}
                className="flex-grow text-center bg-indigo-800 text-white py-2 rounded shadow-lg hover:bg-indigo-800"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="flex-grow text-center bg-red-700 text-white py-2 rounded shadow-lg hover:bg-red-800"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
