export const ALLOWED_MARKETPLACE_TYPE = Object.freeze({
    AUCTION: "auction",
    FIXED_PRICE: "fixed_price"
})
export const ALLOWED_MARKETPLACE_CURRENCIES = Object.freeze({
    US: "us",
})

// Transaction Type to Create New Transaction
export const ALLOWED_TRANSACTION_TYPES = Object.freeze({
    CREATE_NFT: "create_nft",
    LISTING_NFT: "listing_nft",
    BUYING_NFT: "buying_nft",
    SELLING_NFT: "selling_nft",
    BIDDING_TRANSACTION: "bidding_transaction",
})

// Ownership History
export const OWNERSHIP_TYPE = Object.freeze({
    CREATED: "created",
    OWNED: "owned",
})

export const ALLOWED_ACCEPTED_DATE_TYPE = Object.freeze({
    TODAY: "today",
    LAST_DAY: "last_day",
    LAST_WEEK: "last_week",
    CURRENT_WEEK: "current_week",
    CURRENT_MONTH: "current_month",
    CURRENT_YEAR: "current_year",
    LAST_7_DAYS: "last_7_days",
    LAST_MONTH: "last_month",
    LAST_10_DAYS: "last_10_days",
    LAST_15_DAYS: "last_15_days",
    LAST_30_DAYS: "last_30_days",
    LAST_3_MONTHS: "last_3_months",
    LAST_6_MONTHS: "last_6_months",
    LAST_YEAR: "last_year",
    LAST_365_DAYS: "last_365_days",
    ALL_TIME: "all_time",
})

export const ALLOWED_SUPPORT_GRAPH_TYPE = Object.freeze({
    TOTAL_VISITS: "total_visits",
    ALL_ENTITIES: "all_entities",
    UNIQUE_VISITS: "unique_visits",
    TOTAL_REGISTERED_USERS: "total_registered_users",
    ACTIVE_USERS: "active_users",
    NFTS_SOLD: "nfts_sold",
    NEW_REGISTRATIONS: "new_registrations",
    DAILY_AVG_REGISTRATIONS: "daily_avg_registrations",
})
