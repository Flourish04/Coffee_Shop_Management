import React from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { Zap, Users, ShoppingBag } from "lucide-react";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesByDepartment from "../components/overview/SalesByDepartment";

const OverviewPage = () => {    
    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="Overview"/>

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Stats Card */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Sales" icon={Zap} value='253.68M' color="#6366f1"/>
                    <StatCard name="Total Users" icon={Users} value='423729' color="#8b56f6"/>
                    <StatCard name="Total Products" icon={ShoppingBag} value='91' color="#ec4899"/>
                </motion.div>

                {/* Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    <SalesOverviewChart/>
                    <CategoryDistributionChart/>
                    <SalesByDepartment/>
                </div>
            </main>
        </div>
    )
}

export default OverviewPage;