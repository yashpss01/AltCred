import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Activity, ShieldAlert, Zap, Target, Loader2 } from 'lucide-react';

const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // Good, Standard, Poor

const AnalyticsDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [distribution, setDistribution] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real environment, these would fetch from our new endpoints
        // For demonstration, we'll use a mix of real hooks (if they existed) and mock data
        const fetchDashboardData = async () => {
            try {
                // Mocking the API response format for the dashboard components
                setSummary({
                    total_predictions: 1421,
                    predictions_today: 83,
                    average_latency: 39,
                    ml_success_rate: 0.98,
                    active_model: "credit_model_v1"
                });

                setDistribution([
                    { name: 'Good', value: 540 },
                    { name: 'Standard', value: 610 },
                    { name: 'Poor', value: 271 }
                ]);

                setLoading(false);
            } catch (err) {
                console.error("Dashboard failed to load:", err);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-8 text-white">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Credit Risk Analytics</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Monitoring Service Active</span>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                <MetricCard title="Total Predictions" value={summary.total_predictions} icon={<Activity />} color="text-indigo-400" />
                <MetricCard title="Daily Traffic" value={summary.predictions_today} icon={<Zap />} color="text-yellow-400" />
                <MetricCard title="Avg Latency" value={`${summary.average_latency}ms`} icon={<Loader2 />} color="text-blue-400" />
                <MetricCard title="Model Accuracy" value={`${(summary.ml_success_rate * 100).toFixed(1)}%`} icon={<Target />} color="text-green-400" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Risk Distribution */}
                <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
                    <h2 className="mb-6 text-xl font-semibold">Global Risk Distribution</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* System Health */}
                <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
                    <h2 className="mb-6 text-xl font-semibold">Model Health Monitor</h2>
                    <div className="space-y-6">
                        <HealthRow label="Active Version" value={summary.active_model} status="active" />
                        <HealthRow label="Inference Engine" value="FastAPI / Random Forest" status="healthy" />
                        <HealthRow label="SHAP Explainer" value="Enabled" status="healthy" />
                        <HealthRow label="Data Drift" value="Low" status="healthy" />

                        <div className="mt-8 rounded-lg bg-gray-900 p-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Architectural Meta</p>
                            <div className="text-sm space-y-1">
                                <div className="flex justify-between"><span>Rule Weight:</span> <span className="text-indigo-300">40%</span></div>
                                <div className="flex justify-between"><span>ML Weight:</span> <span className="text-indigo-300">60%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon, color }) => (
    <div className="rounded-xl bg-gray-800 p-6 shadow-md border border-gray-700 transition-transform hover:scale-105">
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-medium">{title}</span>
            <div className={color}>{icon}</div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
    </div>
);

const HealthRow = ({ label, value, status }) => (
    <div className="flex items-center justify-between border-b border-gray-700 pb-3">
        <span className="text-gray-400">{label}</span>
        <div className="flex items-center space-x-3">
            <span className="font-mono text-sm">{value}</span>
            <span className={`h-2 w-2 rounded-full ${status === 'healthy' || status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
    </div>
);

export default AnalyticsDashboard;
