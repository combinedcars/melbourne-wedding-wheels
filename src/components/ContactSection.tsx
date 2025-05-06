
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import BusinessHours from './contact/BusinessHours';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-silver-light py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Contact Us</h2>
        <p className="section-subheading">
          Ready to make your wedding transportation extraordinary? Get in touch with us today!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <ContactForm />

          <div className="flex flex-col justify-between">
            <ContactInfo />
            <BusinessHours />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
