// /app/dashboard/purchase/page.tsx

import PurchaseForm from '../../ui/purchase/PurchaseForm';

const PurchasePage = () => {
  return (
    <div className="min-h-screen w-screen md:ml-20 p-10 bg-primary4 pt-16">
      <PurchaseForm />
    </div>
  );
};

export default PurchasePage;