
const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-between items-center px-4 py-2 text-sm text-gray-600 border-t w-full ">
      <div>{currentYear} © Skote.</div>
      <div>Design & Develop by Bloombiz Creative</div>
    </footer>
  )
}

export default Footer


