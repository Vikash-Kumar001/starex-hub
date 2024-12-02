import { useEffect } from "react";

const ErpPortalPage = () => {

  useEffect(() => {
    document.title = 'Access Your ERP Portal - Starex Hub';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-xl font-semibold">ERP Portal Page is under Construction.</p>
        <p className="text-base-content/60 text-base">Thank you for your patience</p>
      </div>
    </div>
  )
}

export default ErpPortalPage