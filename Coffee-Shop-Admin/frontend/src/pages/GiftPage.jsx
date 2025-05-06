import Header from "../components/common/Header";
import GiftRankingLineChart from "../components/gift/GiftRankingLineChart";

const GiftPage = () => {
    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="Gifts"/>

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <GiftRankingLineChart />
            </main>
        </div>
    )
}

export default GiftPage;