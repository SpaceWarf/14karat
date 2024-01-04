import dayjs, { Dayjs } from "dayjs";
import { ReactElement, useEffect, useState } from "react";
import { ProfileInfo } from "../../state/profile";
import Header from "../Common/Header";
import "./Statistics.scss";
import { DatabaseTable, getItems, onItemsSnapshot } from "../../utils/firestore";
import { Job, JobInfo } from "../../state/jobs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StatsCard from "./StatsCard";

type statistics = Map<string, Map<string, number>>;

enum QuickFilters {
  TODAY = "today",
  WEEK_TO_DATE = "week to date",
  LAST_WEEK = "last week",
  LAST_TWO_WEEKS = "last two weeks",
  MONTH_TO_DATE = "month to date",
}

function Statistics() {
  const [roster, setRoster] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState<Dayjs>(dayjs().subtract(13, 'days'));
  const [end, setEnd] = useState<Dayjs>(dayjs());
  const [dateError, setDateError] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<statistics>();
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);
  const [quickFilter, setQuickFilter] = useState<string | undefined>(QuickFilters.LAST_TWO_WEEKS);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      onItemsSnapshot(
        DatabaseTable.PROFILES,
        (profiles: ProfileInfo[]) => setRoster(profiles.filter(profile => !!profile.division))
      );

      onItemsSnapshot(DatabaseTable.JOBS, (jobs: Job[]) => setJobs(jobs));

      setJobInfos(await getItems<JobInfo>(DatabaseTable.JOB_INFO));

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const getStats = (): statistics => {
      return jobs.reduce((memberMap: statistics, job) => {
        const isAfterStart = job.createdAt && new Date(job.createdAt).getTime() >= start.toDate().getTime();
        const isBeforeEnd = job.createdAt && new Date(job.createdAt).getTime() <= end.toDate().getTime();

        if (!job.completed || !isAfterStart || !isBeforeEnd) {
          return memberMap;
        }

        const crew = [
          ...new Set(
            Object.values(job.crew).reduce((crew, members) => [...crew, ...members], [])
          )
        ].filter(member => member);

        crew.forEach(member => {
          if (memberMap.has(member)) {
            memberMap.get(member)?.set(job.job, (memberMap.get(member)?.get(job.job) ?? 0) + 1);
          } else {
            memberMap.set(member, new Map<string, number>([[job.job, 1]]))
          }
        });

        return memberMap;
      }, new Map());
    }

    setStats(getStats());
  }, [roster, jobs, start, end])

  const handleUpdateStart = (start: Dayjs) => {
    setQuickFilter(undefined);
    setDateError(false);
    setStart(start.startOf("day"));

    if (!start.isBefore(end)) {
      setDateError(true);
    }
  }

  const handleUpdateEnd = (end: Dayjs) => {
    setQuickFilter(undefined);
    setDateError(false);
    setEnd(end.endOf("day"));

    if (!start.isBefore(end)) {
      setDateError(true);
    }
  }

  const getStatsCards = (): ReactElement[] => {
    const profileData = roster.map(profile => {
      const profileStats = stats?.get(profile.id)
      return {
        profile,
        stats: profileStats,
        total: getStatsTotal(profileStats),
        ratio: getStatsRatio(profileStats),
      }
    });

    return profileData
      .sort((a, b) => b.total - a.total)
      .map(data => (
        <StatsCard
          profile={data.profile}
          stats={data.stats}
          total={data.total}
          ratio={data.ratio}
          jobInfos={jobInfos}
        />
      ));
  }

  const getStatsTotal = (stats?: Map<string, number>): number => {
    let sum = 0;
    if (stats) {
      stats.forEach(value => {
        sum += value;
      });
    }
    return sum;
  }

  const getStatsRatio = (stats?: Map<string, number>): number => {
    const total = getStatsTotal(stats);

    if (total === 0) {
      return 0;
    }

    let paidTotal = 0;
    if (stats) {
      jobInfos
        .filter(jobInfo => jobInfo.payout)
        .forEach(jobInfo => {
          paidTotal += stats.get(jobInfo.id) ?? 0;
        });
    }
    return paidTotal / total;
  }

  const handleSelectQuickfilter = (filter: string) => {
    setQuickFilter(filter);

    switch (filter) {
      case QuickFilters.TODAY:
        setStart(dayjs().startOf("day"));
        setEnd(dayjs().endOf("day"));
        break;
      case QuickFilters.WEEK_TO_DATE:
        setStart(dayjs().subtract(new Date().getDay(), "days").startOf("day"));
        setEnd(dayjs().endOf("day"));
        break;
      case QuickFilters.LAST_WEEK:
        setStart(dayjs().subtract(6, "days").startOf("day"));
        setEnd(dayjs().endOf("day"));
        break;
      case QuickFilters.LAST_TWO_WEEKS:
        setStart(dayjs().subtract(13, "days").startOf("day"));
        setEnd(dayjs().endOf("day"));
        break;
      case QuickFilters.MONTH_TO_DATE:
        setStart(dayjs().subtract(new Date().getDate() - 1, "days").startOf("day"));
        setEnd(dayjs().endOf("day"));
        break;
    }
  }

  return (
    <div className="Statistics">
      <Header text="Statistics" decorated />
      <div className='Actions'>
        <div className='Filters'>
          <div className="DateFilters">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start"
                value={start}
                disabled={loading}
                onChange={value => handleUpdateStart(dayjs(value))}
              />
              <DatePicker
                label="End"
                value={end}
                disabled={loading}
                onChange={value => handleUpdateEnd(dayjs(value))}
              />
            </LocalizationProvider>
          </div>
          <div className="FilterLabels">
            {Object.values(QuickFilters).map(filter => (
              <div className={`ui label ${quickFilter === filter ? 'selected pale' : ''}`} onClick={() => handleSelectQuickfilter(filter)}>
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>
      {dateError && <p className='error'>The start date must be before the end date.</p>}
      {!dateError && stats && (
        <div className='content'>
          {getStatsCards()}
        </div>
      )}
    </div>
  );
}

export default Statistics;