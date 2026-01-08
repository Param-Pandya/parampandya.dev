import Image from "next/image";

export default function About(): React.JSX.Element {

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
            <p className="text-2xl max-w-6xl mx-auto leading-relaxed">
              I am an <span className="text-purple-400">AI/ML researcher and software engineer</span> with a strong academic background and a research-driven approach to problem solving.
              <br />
              <span className="text-base text-white/80">
                My work focuses on deep learning, NLP, generative AI, and medical image analysis, with an emphasis on building robust and clinically meaningful AI systems.
              </span>
            </p>

        </div>
        <Image 
          src="/assets/illustration.png"
          alt="Skills"
          width={800}
          height={800}
          className="object-cover mx-auto"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </section>
  );
}

