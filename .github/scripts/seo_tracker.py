import datetime
from pytrends.request import TrendReq

def get_seo_trends():
    # Set up pytrends with a generic user-agent to avoid simple blocks
    pytrend = TrendReq(hl='en-US', tz=360)
    
    # Core keywords related to Materialist Christianity
    keywords = ["Christianity", "Historical Jesus", "origins of religion", "church history", "meaning of life"]
    
    report = f"# Weekly SEO Trends Report - {datetime.date.today()}\n\n"
    report += "Here are the rising search queries related to your core topics this week. Consider writing a Field Note answering one of these questions to capture search traffic.\n\n"
    
    for kw in keywords:
        report += f"## 📈 Topic: {kw}\n"
        pytrend.build_payload(kw_list=[kw], timeframe='now 7-d')
        related_queries = pytrend.related_queries()
        
        # Extract the 'rising' queries for the keyword
        rising = related_queries.get(kw, {}).get('rising')
        
        if rising is not None and not rising.empty:
            for index, row in rising.head(10).iterrows():
                query = row['query']
                value = row['value']
                
                # Format the list item. We create a Google Search link for easy research.
                search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
                report += f"- [{query}]({search_url}) *(Score: {value})*\n"
        else:
            report += "- *No significant rising queries this week.*\n"
            
        report += "\n"
        
    return report

if __name__ == "__main__":
    try:
        trends_markdown = get_seo_trends()
        print(trends_markdown)
        
        # Write to an output file that the GitHub action will read
        with open("seo_report.md", "w", encoding='utf-8') as f:
            f.write(trends_markdown)
    except Exception as e:
        print(f"Error fetching trends: {e}")
        # Write error to report so the action still runs but notifies of failure
        with open("seo_report.md", "w", encoding='utf-8') as f:
            f.write(f"# SEO Tracker Error\n\nThe script failed to run. Error: `{e}`")
