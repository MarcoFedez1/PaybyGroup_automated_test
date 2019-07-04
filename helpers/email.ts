import { InbucketAPIClient, PreviewMessageModel } from 'inbucket-js-client';
import { wd } from '../core/wdio';

export class EmailInbox {
    protected mailClient = new InbucketAPIClient('http://qa.automation.green-light.com');
    protected email: string;
    protected inboxName: string;

    constructor(email: string) {
        this.email = email;
        this.inboxName = email.split('@')[0];
    }

    /**
     * Array of email previews for current inbox
     */
    emails() {
        // get all messages in inbox
        return this.mailClient.mailbox(this.inboxName);
    }

    async filter(predicate: (email: PreviewMessageModel, indx: number, obj: PreviewMessageModel[]) => boolean): Promise<PreviewMessageModel[]> {
        const inbox = await this.emails();
        return inbox.filter(predicate);
    }

    async findInMessageText(regex: RegExp, messageId: string): Promise<RegExpExecArray> {
        const source = await this.mailClient.message(this.inboxName, messageId);
        // added output for debug
        // console.log(`${source.body.text}`);
        // apply regex to find exact value in the message body
        let matched = regex.exec(source.body.text);
        if (matched == null) {
            throw new Error(`No matches for ${regex} in source of ${messageId} message, for inbox ${this.inboxName}`);
        }
        return matched;
    }

    async generatedPass(): Promise<string> {
        wd.wait(5);
        const confirmEmail = await this.filter(email => {
            return email.subject.includes('Invitation to join SingleCase');
        });
        // regex that will be used to search in the message
        const regex = /\*(.*)\*/gm;
        const matchedURL = await this.findInMessageText(regex, confirmEmail[confirmEmail.length - 1].id);
        return matchedURL[1];
    }

    async inviteLink(): Promise<string> {
        wd.wait(5);
        const confirmEmail = await this.filter(email => {
            return email.subject.includes('SingleCase registration');
        });
        const regex = /through this link: (.*)\./gm;
        const matchedURL = await this.findInMessageText(regex, confirmEmail[confirmEmail.length - 1].id);
        // console.log(`URL: ${matchedURL[1]}`);
        return matchedURL[1];
    }
}