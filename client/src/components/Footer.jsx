export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CropCare AI. All rights reserved.</p>
        <p className="text-sm mt-2">Empowering farmers with AI-driven insights.</p>
      </div>
    </footer>
  );
}
