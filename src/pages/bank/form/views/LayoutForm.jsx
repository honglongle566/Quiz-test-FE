import { useEffect } from "react";
import ConfirmDialog from "./ConfirmDialog";
import FormInfo from "./FormView";
import { initData } from "slices/bank/bankForm";
import { useDispatch } from "react-redux";

const LayoutForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData());
  }, []);
  return (
    <div>
      <FormInfo />
      <ConfirmDialog />
    </div>
  );
};

export default LayoutForm;
