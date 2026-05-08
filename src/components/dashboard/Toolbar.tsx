import AddRecordModal from "./AddRecordModal";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between">
      
      <h2 className="text-xl font-semibold">
        Overview
      </h2>

      <AddRecordModal />

    </div>
  );
}