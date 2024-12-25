export default function DashboardPaymentMethodView({
    type,
    provider,
    balance,
    expires_at,
    is_primary,
}: {
    type: string;
    provider: string;
    balance: number;
    expires_at: Date;
    is_primary: boolean;
    key: number;
}) {
    const date = `${expires_at.getDay()}/${expires_at.getMonth()}`;
    return (
        <div
            className={`flex flex-col w-full md:w-80 h-fit p-5 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102
            ${
                is_primary
                    ? 'border-2 border-yellow-500 bg-primary1 text-primary4 hover:bg-transparent hover:text-primary1'
                    : ' border-2 border-primary1 bg-primary3 text-primar1 hover:bg-transparent'
            }`}
        >
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col justify-between w-full">
                    {is_primary ? (
                        <p className="text-xs font-bold text-yellow-500">Primary</p>
                    ) : (
                        <p className="text-xs font-bold">Secondary</p>
                    )}
                    <p className="text-lg font-bold">{type}</p>
                </div>
                <p className="text-s font-bold">Balance {balance} $</p>
            </div>
            <div className="flex flex-row justify-between w-full mt-2">
                <div>
                    <p className="text-xs font-semibold">Expires at</p>
                    <p className="text-xs font-bold">{date}</p>
                </div>
            </div>
            <div className="flex flex-row justify-end items-right w-full mt-2">
                <p className="text-xl font-extrabold">{provider}</p>
            </div>
        </div>
    );
}
