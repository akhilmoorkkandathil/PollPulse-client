
export interface PollOption {
    name: string;   // Name of the option
    votes: number;  // Number of votes for the option
}


export interface Poll {
    _id?: string;                      // Unique identifier for the poll
    question: string;                 // The question of the poll
    options?: PollOption[];            // Array of options
    totalVotes: number;               // Total number of votes
    createdBy?: string;                // User ID of the creator
    submitted?: string[];              // Array of user IDs who have submitted their votes
}
