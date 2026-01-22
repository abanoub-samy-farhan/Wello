import Image from "next/image";
export default function ContactUs() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements[0] as HTMLInputElement).value;
        const email = (form.elements[1] as HTMLInputElement).value;
        const message = (form.elements[2] as HTMLTextAreaElement).value;

        const subject = `Contact Us Message from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;

        window.location.href = `mailto:abanoubsamy2341@gmail.com?subject=${subject}&body=${body}`;
    }
    return (
        <section id="contact_us" className="mt-36 p-8 md:p-20 h-auto w-full overflow-hidden bg-gray-50 flex flex-col md:flex-row gap-12 p4th-bg">
            {/* Header */}
            <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-1/2 text-center md:text-left">
                <p className="text-lg text-gray-600 leading-relaxed">
                    Have questions or concerns?
                </p>
                <h2 className="text-4xl md:text-7xl font-extrabold p1st">Contact Us</h2>
                {/* Social Media icons */}
                <div className="flex flex-row gap-4 text-black w-full md:justify-start justify-center mt-2 border-t-2 pt-4">
                    <a href="#" className="hover:text-[#3b1e54]">
                        <Image src="/facebook.svg" alt="Facebook" width={32} height={32} className="hover:text-[#3b1e54]" />    
                    </a>
                    <a href="#" className="hover:text-[#3b1e54]">
                        <Image src="/icons8-linkedin-logo.svg" alt="Facebook" width={32} height={32} />    
                    </a>
                    <a href="#" className="hover:text-[#3b1e54]">
                        <Image src="/icons8-x-logo.svg" alt="Facebook" width={32} height={32} />    
                    </a>
                </div>

            </div>

            {/* Contact form */}
            <div className="flex flex-col gap-4 items-center md:items-end w-full md:w-1/2 text-black">
                <form className="flex flex-col gap-4 w-full max-w-lg"
                onSubmit={handleSubmit}
                >
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="p-4 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="p-4 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                    />
                    <textarea 
                        placeholder="Message" 
                        className="p-4 border-2 border-gray-200 rounded-lg h-40 
                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                    />
                    <button 
                        type="submit"
                        className="text-[#3b1e54] hover:text-white border-2 border-[#3b1e54] 
                        hover:bg-[#3b1e54] font-semibold py-3 px-6 rounded-lg 
                        transition-all ease-in-out duration-300 w-full md:w-fit">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}
