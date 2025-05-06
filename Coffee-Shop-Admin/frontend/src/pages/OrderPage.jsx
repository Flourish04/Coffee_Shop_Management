import { Clock, CheckCircle, ShoppingBag } from "lucide-react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import OrderTable from "../components/orders/OrderTable";

const OrderPage = () => {
    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="Orders"/>

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Orders" icon={ShoppingBag} value="11940055" color="#6366f1" />
                    <StatCard name="Pending Orders" icon={Clock} value="0" color="#8b56f6" />
                    <StatCard name="Completed Orders" icon={CheckCircle} value="11940055" color="#ec4899" />
                </motion.div>
                <OrderTable />
            </main>
        </div>
    )
}

export default OrderPage;