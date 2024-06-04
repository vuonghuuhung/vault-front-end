import { useState } from 'react';
import Loading from 'src/components/Loading/Loading';
import { useControllerInfo } from 'src/hooks/useControllerInfo';
import { useStorageInfo } from 'src/hooks/useStorageInfo';
import { addHardWorker, addToWhiteList, removeFromWhiteList, removeHardWorker } from 'src/utils/ContractClient';
import { useEthersSigner } from 'src/utils/ethers';

const Controller = () => {
    const { controllerInfos, isLoading } = useControllerInfo();
    const { storageInfo, isStorageLoading } = useStorageInfo();

    const [newHardWorker, setNewHardWorker] = useState<string>('');
    const [removeNewardWorker, setRemoveNewHardWorker] = useState<string>('');
    const [newAddress, setNewAddress] = useState<string>('');
    const [removeAddress, setRemoveAddress] = useState<string>('');

    const signer = useEthersSigner({ chainId: 31337 });

    const seeAddress = (address: string) => {
        // open a new tab to see transaction
        window.open(`https://app.tryethernal.com/address/${address}`);
    };

    const handleAddHardWorker = async () => {
        try {
            if (signer && newHardWorker != '') {
                const tx = await addHardWorker({ signer, worker: newHardWorker });
                console.log(tx);
            }
        } catch (error) {
            console.error('Error adding hard worker', error);
        }
    };

    const handleRemoveHardWorker = async () => {
        try {
            if (signer && removeNewardWorker != '') {
                const tx = await removeHardWorker({ signer, worker: removeNewardWorker });
                console.log(tx);
            }
        } catch (error) {
            console.error('Error removing hard worker', error);
        }
    };

    const handleAddToWhiteList = async () => {
        try {
            if (signer && newAddress != '') {
                const tx = await addToWhiteList({ signer, address: newAddress });
                console.log(tx);
            }
        } catch (error) {
            console.error('Error adding to white list', error);
        }
    };

    const handleRemoveFromWhiteList = async () => {
        try {
            if (signer && removeAddress != '') {
                const tx = await removeFromWhiteList({ signer, address: removeAddress });
                console.log(tx);
            }
        } catch (error) {
            console.error('Error removing from white list', error);
        }
    };

    return (
        <div>
            {controllerInfos && storageInfo && (
                <div className="min-h-screen p-10 bg-gray-100">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-black">Controller configurations</h1>
                        <p className="mb-6 text-black" onClick={() => seeAddress(controllerInfos.address)}>
                            Contract address: {controllerInfos.address}
                        </p>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-black">Hard Worker Data</h2>
                            <p className="mb-4 text-black">Hard Worker addresses: </p>
                            <ul>
                                {controllerInfos.hardWorkers.map((worker, index) => (
                                    <li
                                        key={index}
                                        className="text-black"
                                        onClick={() => seeAddress(worker)}
                                    >
                                        {worker}
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="new hard worker"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                    onChange={(e) => setNewHardWorker(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700"
                                    onClick={handleAddHardWorker}
                                >
                                    Add new hard worker
                                </button>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="hard worker"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                    onChange={(e) => setRemoveNewHardWorker(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700"
                                    onClick={handleRemoveHardWorker}
                                >
                                    Remove hard worker
                                </button>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-black">White list</h2>
                            <p className="mb-4 text-black">White list addresses: </p>
                            <ul>
                                {controllerInfos.whiteList.map((address, index) => (
                                    <li
                                        key={index}
                                        className="text-black"
                                        onClick={() => seeAddress(address)}
                                    >
                                        {address}
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="new address"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700"
                                    onClick={handleAddToWhiteList}
                                >
                                    Add new address
                                </button>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="address"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                    onChange={(e) => setRemoveAddress(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700"
                                    onClick={handleRemoveFromWhiteList}
                                >
                                    Remove address
                                </button>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-black">Fee Config</h2>
                            <p
                                className="mb-4 text-black"
                                onClick={() => seeAddress(controllerInfos.profitProtocolReceiver)}
                            >
                                Profit protocol receiver: {controllerInfos.profitProtocolReceiver}
                            </p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="next profit protocol receiver"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                    Set new protocol receiver
                                </button>
                            </div>
                            <p className="mb-4 text-black">
                                Profit protocol numerator: {controllerInfos.profitProtocolNumerator}
                            </p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="next profit protocol numerator"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                    Set new numerator
                                </button>
                            </div>
                            <p className="mb-4 text-black">
                                Profit strategist numerator: {controllerInfos.profitStrategistNumerator}
                            </p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="next profit strategist numerator"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                    Set new numerator
                                </button>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-black">Update config</h2>
                            <p className="mb-4 text-black">
                                Implementation delay: {controllerInfos.implementationDelay}
                            </p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="new implementation delay"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                    Set new implementation delay
                                </button>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-xl font-semibold mb-2 text-black">Rotation config</h2>
                            <p
                                className="mb-4 text-black"
                                onClick={() => seeAddress(controllerInfos.universalLiquidator)}
                            >
                                Universal Liquidator: {controllerInfos.universalLiquidator}
                            </p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="new universal liquidator"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                    Set new universal liquidator
                                </button>
                            </div>
                            <p className="mb-4 text-black" onClick={() => seeAddress(controllerInfos.rewardForwarder)}>
                                Reward Forwarder: {controllerInfos.rewardForwarder}
                            </p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="new reward forwarder"
                                    className="border p-2 rounded mb-2 w-full text-black"
                                />
                                <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                    Set new reward forwarder
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-md mt-10">
                        <h1 className="text-2xl font-bold mb-4 text-black">Storage data:</h1>
                        <p className="mb-4 text-black" onClick={() => seeAddress(storageInfo.address)}>
                            Contract address: {storageInfo.address}
                        </p>
                        <p className="mb-4 text-black" onClick={() => seeAddress(storageInfo.governance)}>
                            Governance address: {storageInfo.governance}
                        </p>
                        <p className="mb-4 text-black" onClick={() => seeAddress(storageInfo.controller)}>
                            Controller address: {storageInfo.controller}
                        </p>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="new governance"
                                className="border p-2 rounded mb-2 w-full text-black"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                Update Governance
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="new controller"
                                className="border p-2 rounded mb-2 w-full text-black"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-700">
                                Update Controller
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {(isLoading || isStorageLoading) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen">
                    <Loading isSignContract />
                </div>
            )}
        </div>
    );
};

export default Controller;
