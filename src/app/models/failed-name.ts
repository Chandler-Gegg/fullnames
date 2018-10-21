export class FailedName {
    firstName: string;
    lastName: string;
    failureType: string;

    constructor (firstName: string, lastName: string, failureType: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.failureType = failureType;
    }
    getFailedName() {
        switch (this.failureType) {
            case 'first':
                return this.firstName;
            case 'last':
                return this.lastName;
            case 'both':
                return `${this.firstName} ${this.lastName}`;
        }
    }

    firstFailed() {
        return this.failureType === 'both' || this.failureType === 'first';
    }

    lastFailed() {
        return this.failureType === 'both' || this.failureType === 'last';
    }
}
