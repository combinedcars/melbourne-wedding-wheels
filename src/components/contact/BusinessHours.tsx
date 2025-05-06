
const BusinessHours = () => {
  return (
    <div className="mt-12 bg-primary text-white p-6 rounded-lg">
      <h4 className="text-xl font-semibold mb-4">Our Hours</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Monday - Friday</span>
          <span>9:00 AM - 6:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Saturday</span>
          <span>9:00 AM - 4:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Sunday</span>
          <span>By Appointment</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="italic">
          Note: Wedding transportation services available 24/7 by prior arrangement.
        </p>
      </div>
    </div>
  );
};

export default BusinessHours;
