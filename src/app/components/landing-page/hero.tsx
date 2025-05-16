import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="hero bg-gray-400 text-white py-16 px-8 rounded-sm"
      style={{
        backgroundImage: "url('/bussiness-pessoas-trabalhando-em-equipe-em-um-escritorio.jpg')",
         backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "calc(100vh)",
      }}
    >
      <div className="text-center px-4 mt-58">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao RH System!</h1>
        <p className="text-lg mb-8">
          Aqui você encontrará tudo o que precisa para gerenciar seu departamento de recursos humanos de forma eficiente e eficaz.
        </p>
       
      </div>
    </section>
  );
};

export default Hero;
