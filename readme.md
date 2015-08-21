# Kollection

[![Build Status](https://travis-ci.org/bnolan/kollection.svg)](https://travis-ci.org/bnolan/kollection)

A collection class that acts as a souped-up array, insantiates models and supports the node streams api and filters. By creating one collection that is piped from another collection, you can read and write from that collection and changes will be reflected back to the parent collection. You can specify filters that turn sub-collections into views. You can stream a collection over any node compliant stream, a localStorage serialization stream is provided.