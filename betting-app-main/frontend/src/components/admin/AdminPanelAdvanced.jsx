import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AdminPanelAdvanced = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionAmount, setActionAmount] = useState(0);

  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', balance: 5000, status: 'active', bets: 150 },
    { id: 2, name: 'User 2', email: 'user2@example.com', balance: 3000, status: 'active', bets: 200 },
    { id: 3, name: 'User 3', email: 'user3@example.com', balance: 1500, status: 'frozen', bets: 50 },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, user: 'User 1', type: 'deposit', amount: 1000, status: 'completed', date: '2026-05-23' },
    { id: 2, user: 'User 2', type: 'withdrawal', amount: 500, status: 'pending', date: '2026-05-23' },
    { id: 3, user: 'User 1', type: 'bet', amount: 100, status: 'completed', date: '2026-05-23' },
  ]);

  const [withdrawals, setWithdrawals] = useState([
    { id: 1, user: 'User 2', amount: 500, bank: '****1234', status: 'pending' },
    { id: 2, user: 'User 3', amount: 300, bank: '****5678', status: 'pending' },
  ]);

  const [supportTickets, setSupportTickets] = useState([
    { id: 1, user: 'User 1', issue: 'Payment not received', status: 'open' },
    { id: 2, user: 'User 2', issue: 'Account frozen', status: 'open' },
  ]);

  const analytics = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    totalBalance: users.reduce((sum, u) => sum + u.balance, 0),
    totalBets: users.reduce((sum, u) => sum + u.bets, 0),
    totalTransactions: transactions.length,
    pendingWithdrawals: withdrawals.filter((w) => w.status === 'pending').length,
  };

  const handleUserAction = (actionType, amount) => {
    if (!selectedUser) {
      toast.error('Please select a user');
      return;
    }

    const userIndex = users.findIndex((u) => u.id === selectedUser.id);
    const updatedUsers = [...users];

    switch (actionType) {
      case 'freeze':
        updatedUsers[userIndex].status = 'frozen';
        toast.success(`User frozen`);
        break;
      case 'unfreeze':
        updatedUsers[userIndex].status = 'active';
        toast.success(`User unfrozen`);
        break;
      case 'disable':
        updatedUsers[userIndex].status = 'disabled';
        toast.success(`User disabled`);
        break;
      case 'enable':
        updatedUsers[userIndex].status = 'active';
        toast.success(`User enabled`);
        break;
      case 'deduct':
        updatedUsers[userIndex].balance -= amount;
        toast.success(`Deducted ${amount} tokens`);
        break;
      case 'donate':
        updatedUsers[userIndex].balance += amount;
        toast.success(`Donated ${amount} tokens`);
        break;
      case 'delete':
        updatedUsers.splice(userIndex, 1);
        toast.success(`User deleted`);
        setSelectedUser(null);
        break;
      default:
        break;
    }

    setUsers(updatedUsers);
    setActionType('');
    setActionAmount(0);
  };

  const approveWithdrawal = (id) => {
    const updated = withdrawals.map((w) =>
      w.id === id ? { ...w, status: 'approved' } : w
    );
    setWithdrawals(updated);
    toast.success('Withdrawal approved');
  };

  const rejectWithdrawal = (id) => {
    const updated = withdrawals.map((w) =>
      w.id === id ? { ...w, status: 'rejected' } : w
    );
    setWithdrawals(updated);
    toast.error('Withdrawal rejected');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-red-500 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-500">🛡️ Admin Control Panel</h1>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['dashboard', 'users', 'transactions', 'withdrawals', 'support'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Total Users', value: analytics.totalUsers, icon: '👥', color: 'blue' },
              { label: 'Active Users', value: analytics.activeUsers, icon: '✅', color: 'green' },
              { label: 'Total Balance', value: `${analytics.totalBalance}`, icon: '💰', color: 'yellow' },
              { label: 'Total Bets', value: analytics.totalBets, icon: '🎰', color: 'purple' },
              { label: 'Transactions', value: analytics.totalTransactions, icon: '📊', color: 'indigo' },
              { label: 'Pending Withdrawals', value: analytics.pendingWithdrawals, icon: '⏳', color: 'red' },
            ].map((stat, idx) => (
              <div key={idx} className={`bg-${stat.color}-900 border border-${stat.color}-500 rounded-lg p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <span className="text-4xl">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User List */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="bg-red-600 px-6 py-4">
                  <h3 className="font-bold text-white">Users</h3>
                </div>
                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedUser?.id === user.id
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-bold">{user.name}</div>
                      <div className="text-xs">{user.email}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* User Details & Actions */}
            <div className="lg:col-span-2 space-y-6">
              {selectedUser ? (
                <>
                  {/* User Details */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-red-500">
                    <h3 className="text-xl font-bold text-red-500 mb-4">👤 User Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white font-bold">{selectedUser.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white">{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Balance:</span>
                        <span className="text-green-400 font-bold">{selectedUser.balance} Tokens</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span
                          className={`font-bold ${
                            selectedUser.status === 'active'
                              ? 'text-green-400'
                              : selectedUser.status === 'frozen'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {selectedUser.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Bets:</span>
                        <span className="text-white">{selectedUser.bets}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-red-500">
                    <h3 className="text-xl font-bold text-red-500 mb-4">⚙️ Admin Actions</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {['freeze', 'unfreeze', 'disable', 'enable'].map((action) => (
                          <button
                            key={action}
                            onClick={() => handleUserAction(action)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition"
                          >
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Token Amount</label>
                          <input
                            type="number"
                            value={actionAmount}
                            onChange={(e) => setActionAmount(parseInt(e.target.value) || 0)}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                            placeholder="0"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleUserAction('deduct', actionAmount)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded font-bold transition"
                          >
                            💔 Deduct
                          </button>
                          <button
                            onClick={() => handleUserAction('donate', actionAmount)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition"
                          >
                            🎁 Donate
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleUserAction('delete')}
                        className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-bold transition"
                      >
                        🗑️ Delete User
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
                  Select a user to manage
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-white font-bold">User</th>
                    <th className="px-6 py-3 text-left text-white font-bold">Type</th>
                    <th className="px-6 py-3 text-left text-white font-bold">Amount</th>
                    <th className="px-6 py-3 text-left text-white font-bold">Status</th>
                    <th className="px-6 py-3 text-left text-white font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-300">{tx.user}</td>
                      <td className="px-6 py-4 text-gray-300">{tx.type}</td>
                      <td className="px-6 py-4 text-green-400 font-bold">{tx.amount} Tokens</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            tx.status === 'completed'
                              ? 'bg-green-900 text-green-400'
                              : 'bg-yellow-900 text-yellow-400'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className="space-y-4">
            {withdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">User</p>
                    <p className="text-xl font-bold text-white">{withdrawal.user}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-2xl font-bold text-green-400">{withdrawal.amount} Tokens</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Bank</p>
                    <p className="text-white font-mono">{withdrawal.bank}</p>
                  </div>
                </div>

                {withdrawal.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => approveWithdrawal(withdrawal.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold transition"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => rejectWithdrawal(withdrawal.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}

                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      withdrawal.status === 'pending'
                        ? 'bg-yellow-900 text-yellow-400'
                        : withdrawal.status === 'approved'
                        ? 'bg-green-900 text-green-400'
                        : 'bg-red-900 text-red-400'
                    }`}
                  >
                    {withdrawal.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">User</p>
                    <p className="text-xl font-bold text-white">{ticket.user}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      ticket.status === 'open'
                        ? 'bg-red-900 text-red-400'
                        : 'bg-green-900 text-green-400'
                    }`}
                  >
                    {ticket.status.toUpperCase()}
                  </span>
                </div>

                <div className="bg-gray-700 p-4 rounded mb-4">
                  <p className="text-gray-300">{ticket.issue}</p>
                </div>

                {ticket.status === 'open' && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold transition">
                    Respond
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelAdvanced;
