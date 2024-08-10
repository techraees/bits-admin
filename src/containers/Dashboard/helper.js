

// Function to calculate the timeframes
export const calculateTimeFrames = (data) => {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const lastYearData = data.filter(item => new Date(item.createdAt) >= oneYearAgo);
    const lastYearCountByMonth = {};

    lastYearData.forEach(item => {
        const date = new Date(item.createdAt);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        lastYearCountByMonth[monthKey] = (lastYearCountByMonth[monthKey] || 0) + 1;
    });

    const lastWeekData = data.filter(item => new Date(item.createdAt) >= oneWeekAgo);
    const lastWeekCountByDay = {};
    const lastWeekDayNames = {};

    lastWeekData.forEach(item => {
        const date = new Date(item.createdAt);
        const dayKey = date.toISOString().split('T')[0];
        const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
        lastWeekCountByDay[dayKey] = (lastWeekCountByDay[dayKey] || 0) + 1;
        lastWeekDayNames[dayName] = (lastWeekDayNames[dayName] || 0) + 1;
    });

    const lastWeekCount = lastWeekData.length;
    const lastMonthCount = data.filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate.getMonth() === now.getMonth() - 1 && itemDate.getFullYear() === now.getFullYear();
    }).length;

    const lastYearCount = lastYearData.length;

    return {
        lastWeek: lastWeekCount,
        lastMonth: lastMonthCount,
        lastYear: lastYearCount,
        lastYearBreakdown: lastYearCountByMonth,
        lastWeekBreakdown: lastWeekCountByDay,
        lastWeekDayNames: lastWeekDayNames,
    };
};

export const handleMaxView = (data, setChartData, setCountValue) => {
    const dates = data.map(item => new Date(item.createdAt));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    const labels = [];
    const chartData = [];

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
        const label = d.toISOString().split('T')[0];
        labels.push(label);
        chartData.push(data.filter(item => item.createdAt.startsWith(label)).length);
    }

    setChartData({
        data: chartData,
        labels,
    });
    setCountValue(chartData.length)
    // setView('max');
};

// Handle view change
export const handleViewChange = (data, viewType, setChartData, setCountValue,) => {
    const { lastWeekBreakdown, lastYearBreakdown } = calculateTimeFrames(data);

    if (viewType === 'lastWeek') {
        const labels = Object.keys(lastWeekBreakdown);
        const chartData = labels.map(label => lastWeekBreakdown[label]);

        setChartData({
            data: chartData,
            labels,
        });
        setCountValue(chartData.length)
    } else if (viewType === 'lastMonth') {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the last month

        const labels = [];
        const chartData = [];

        for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
            const label = d.toISOString().split('T')[0];
            labels.push(label);
            chartData.push(data.filter(item => item.createdAt.startsWith(label)).length);
        }

        setChartData({
            data: chartData,
            labels,
        });

        setCountValue(chartData.length)

    } else if (viewType === 'lastYear') {
        const labels = Object.keys(lastYearBreakdown);
        const chartData = labels.map(label => lastYearBreakdown[label]);

        setChartData({
            data: chartData,
            labels,
        });
        setCountValue(chartData.length)

    }
    // setView(viewType);

};