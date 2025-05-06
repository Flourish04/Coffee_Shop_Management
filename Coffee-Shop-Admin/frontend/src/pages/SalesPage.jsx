import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";

const SalesPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Sales"/>
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Sales" icon={DollarSign} value="253.68M" color="#6366f1" />
                    <StatCard name="Total Orders" icon={ShoppingCart} value="11940055" color="#8b56f6" />
                    <StatCard name="Total Customers" icon={TrendingUp} value="423729" color="#ec4899" />
                </motion.div>
                <SalesOverviewChart />
            </main>
        </div>
    );
}

export default SalesPage;