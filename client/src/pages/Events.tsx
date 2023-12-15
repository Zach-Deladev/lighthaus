import React, { useState, useEffect } from "react";
import { useData, DataContextType } from "../context/DataContext";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

interface EventData {
  _id: string;
  user: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  startTime: string;
  endTime: string;
  ticketLink: string;
}

interface EventsProps {
  onHome?: boolean;
}

const Events: React.FC<EventsProps> = ({ onHome }) => {
  const {
    isAuthenticated,
    events,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useData() as DataContextType;

  const [loading, setLoading] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchEvents().finally(() => setLoading(false));
  }, []);

  const handleCreateOrUpdateEvent = async (eventData: EventData) => {
    setLoading(true);
    if (editingEvent) {
      await updateEvent(editingEvent._id, eventData);
      toast.success("Event edited!");
    } else {
      await createEvent(eventData);
      toast.success("Event created!");
    }
    setEditingEvent(null);
    setShowEventForm(false);
    await fetchEvents();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteEvent(id);
    toast.info("Event deleted!");
    await fetchEvents();
    setLoading(false);
  };

  return (
    <div className="container mx-auto  my-12 px-2 dark:bg-gray-900">
      <div className="flex justify-between  mt-20 items-center mb-6 dark:text-white">
        <h1
          className={`${
            onHome ? "text-center w-full text-5xl" : "text-5xl"
          } font-semibold text-white`}
        >
          {onHome ? "Upcoming Events" : "Events"}
        </h1>
        {!onHome && isAuthenticated && (
          <button
            className="bg-indigo-800 text-white rounded px-4 py-2 dark:bg-indigo-800"
            onClick={() => {
              setEditingEvent(null);
              setShowEventForm(true);
            }}
          >
            Create Event
          </button>
        )}
      </div>

      {showEventForm && isAuthenticated && !onHome && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dark:bg-opacity-70"
          onClick={() => setShowEventForm(false)}
        >
          <div
            className="bg-white rounded-lg p-8 w-2/3 dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-gray-300 hover:text-gray-600 float-right dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowEventForm(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <EventForm
              initialValues={editingEvent}
              onSubmit={handleCreateOrUpdateEvent}
              loading={loading}
            />
          </div>
        </div>
      )}

      {loading ? (
        <Loader height={40} />
      ) : (
        <div
          className={
            onHome ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3" : ""
          }
        >
          {events.map((event: EventData) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={
                !onHome && isAuthenticated
                  ? () => setEditingEvent(event)
                  : undefined
              }
              onDelete={
                !onHome && isAuthenticated
                  ? () => handleDelete(event._id)
                  : undefined
              }
              showButtons={!onHome && isAuthenticated}
              isHomePage={onHome}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
