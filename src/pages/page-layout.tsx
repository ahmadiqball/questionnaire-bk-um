import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store";

export function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCounselorPage = location.pathname.includes('counselor') && location.pathname !== '/counselor/start';
  const isAssessmentPage = location.pathname.includes('assessment') && location.pathname !== '/assessment/start'; 
  const isCounselor = sessionStorage.getItem('role') === import.meta.env.VITE_ADMIN_ID;
  const { userData } = useStore();

  useEffect(() => {
    if (isCounselorPage && !isCounselor) {
      navigate('/');
    } else if (isAssessmentPage && !userData) {
      navigate('/assessment/start');
    }

  }, [])

  if (isCounselorPage && !isCounselor) {
    return null;
  }

  return (
    <>
      <Outlet />
    </>
  )
}
