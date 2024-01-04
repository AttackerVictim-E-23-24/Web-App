// MonitoringModel.js
class MonitoringModel {
  constructor(startDate , frequency , downtime , offlineTime , minDistance , record , endDate ) {
    this.startDate = startDate;
    this.frequency = frequency;
    this.downtime = downtime;
    this.offlineTime = offlineTime;
    this.minDistance = minDistance;
    this.record = record;
    this.endDate = endDate;
  }
}

export default MonitoringModel;
