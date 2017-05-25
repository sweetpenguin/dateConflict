function dateConflict(curDate, dateList) {
    curDate.startDate = new Date(curDate.startDate.replace(/-/g, "/"));
    curDate.endDate = new Date(curDate.endDate.replace(/-/g, "/"));
    var isConflict = false;
    for (i in dateList) {
        var row = dateList[i];
        //判断时间
        if (((new Date("2017/01/01 " + row.startTime)) == (new Date("2017/01/01 " + curDate.startTime))) || ((new Date("2017/01/01 " + row.startTime)) < (new Date("2017/01/01 " + curDate.endTime)) && (new Date("2017/01/01 " + row.endTime)) > (new Date("2017/01/01 " + curDate.startTime)))) {
            //时间有交集
        } else {
            continue;
        }
        //判断周
        var weekDay1 = curDate.weekDay.split(",");
        var weekDay2 = row.weekDay.split(",");
        var weekDay = {};
        for (w1 in weekDay1) {
            for (w2 in weekDay2) {
                if (weekDay1[w1] == weekDay2[w2]) {
                    weekDay[weekDay1[w1]] = 1;
                }
            }
        }
        if (weekDay.length == 0) {
            continue;
        }
        //判断日期
        row.startDate = new Date(row.startDate.replace(/-/g, "/"));
        row.endDate = new Date(row.endDate.replace(/-/g, "/"));
        if (row.startDate <= curDate.endDate && row.endDate >= curDate.startDate) {
            var startDate = row.startDate > curDate.endDate ? row.endDate : curDate.startDate;
            var endDate = row.endDate > curDate.endDate ? curDate.endDate : row.endDate;
            while (startDate <= endDate) {
                var week = startDate.getDay() == 0 ? 7 : startDate.getDay();
                startDate.setDate(startDate.getDate() + 1);
                if (!weekDay[week]) {
                    continue;
                } else {
                    isConflict = true;
                    break;
                }
            }
        }
        if (isConflict)
            return isConflict;
    }
    return isConflict;
}