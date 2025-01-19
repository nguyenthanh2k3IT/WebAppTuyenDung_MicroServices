function SettingPage() {
    return (
        <div className="wrapper">
            <div className="max-w-4xl mx-auto p-6 ">
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold">General Information</h2>
                    <div className="mt-2">
                        <label className="block text-sm font-medium">Email:</label>
                        <p className="text-gray-700">namdinhthuan5@gmail.com</p>
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium">Full name:</label>
                        <p className="text-gray-700">N a m</p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold">Job Invitation Notifications</h2>
                    <div className="mt-2">
                        <label className="block text-sm font-medium">
                            Allow to receive job invitations from employers:
                        </label>
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Yes</span>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-medium">Don’t receive invitations from:</label>
                        <input type="text" placeholder="Search company" className="border rounded-md p-2 w-full" />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Delete Account</h2>
                    <p className="mt-2 text-red-600">This action cannot be undone.</p>
                    <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default SettingPage;
