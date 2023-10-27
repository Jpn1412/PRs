class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    // Paste the codes you already did from the "Git Out Bug!" assignment
    status() {
        const changes = Object.keys(this.working_directory.new_changes);
        const changeCount = changes.length;

        if (changeCount === 0) {
            return 'You have 0 change/s.\n';
        } else {
            const changeList = changes.join('\n');
            return `You have ${changeCount} change/s.\n${changeList}`;
        }
    }

    //Command: git add <filename/file directory/wildcard>
    add(path_file) {
        const modified_files = this.working_directory.new_changes;

        if (path_file === "." || path_file === "*") {
            for (const file in modified_files) {
                if (path_file === "*" || file === path_file) {
                    this.staging.push(modified_files[file]);
                    delete modified_files[file];
                }
            }
        } else if (modified_files[path_file]) {
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        } else {
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;
